const {getType, checkIdCard} = require("./utils");
const {ERROR} = require("./error");
const baseValidator = Object.create(null)
const baseType = ['string', 'boolean', 'number', 'null'] // undefined不会由客户端提交上来

baseValidator.realName = function (realName) {
  if (
    typeof realName !== 'string' ||
    realName.length < 2 ||
    !/^[\u4e00-\u9fa5]{1,10}(·?[\u4e00-\u9fa5]{1,10}){0,5}$/.test(realName)
  ) {
    return {
      errCode: ERROR.INVALID_REAL_NAME
    }
  }
}


baseValidator.idCard = function (idCard) {
  if (!checkIdCard(idCard)) {
    return {
      errCode: ERROR.INVALID_ID_CARD
    }
  }
}

baseType.forEach((type) => {
  baseValidator[type] = function (val) {
    if (getType(val) === type) {
      return
    }
    return {
      errCode: ERROR.INVALID_PARAM
    }
  }
})

function tokenize(name) {
  let i = 0
  const result = []
  let token = ''
  while (i < name.length) {
    const char = name[i]
    switch (char) {
      case '|':
      case '<':
      case '>':
        token && result.push(token)
        result.push(char)
        token = ''
        break
      default:
        token += char
        break
    }
    i++
    if (i === name.length && token) {
      result.push(token)
    }
  }
  return result
}

/**
 * 处理validator名
 * @param {string} name
 */
function parseValidatorName(name) {
  const tokenList = tokenize(name)
  let i = 0
  let currentToken = tokenList[i]
  const result = {
    type: 'root',
    children: [],
    parent: null
  }
  let lastRealm = result
  while (currentToken) {
    switch (currentToken) {
      case 'array': {
        const currentRealm = {
          type: 'array',
          children: [],
          parent: lastRealm
        }
        lastRealm.children.push(currentRealm)
        lastRealm = currentRealm
        break
      }
      case '<':
        if (lastRealm.type !== 'array') {
          throw new Error('Invalid validator token "<"')
        }
        break
      case '>':
        if (lastRealm.type !== 'array') {
          throw new Error('Invalid validator token ">"')
        }
        lastRealm = lastRealm.parent
        break
      case '|':
        if (lastRealm.type !== 'array' && lastRealm.type !== 'root') {
          throw new Error('Invalid validator token "|"')
        }
        break
      default:
        lastRealm.children.push({
          type: currentToken
        })
        break
    }
    i++
    currentToken = tokenList[i]
  }
  return result
}

function getRuleCategory(rule) {
  switch (rule.type) {
    case 'array':
      return 'array'
    case 'root':
      return 'root'
    default:
      return 'base'
  }
}

function isMatchUnionType(val, rule) {
  if (!rule.children || rule.children.length === 0) {
    return true
  }
  const children = rule.children
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    const category = getRuleCategory(child)
    let pass = false
    switch (category) {
      case 'base':
        pass = isMatchBaseType(val, child)
        break
      case 'array':
        pass = isMatchArrayType(val, child)
        break
      default:
        break
    }
    if (pass) {
      return true
    }
  }
  return false
}

function isMatchBaseType(val, rule) {
  if (typeof baseValidator[rule.type] !== 'function') {
    throw new Error(`invalid schema type: ${rule.type}`)
  }
  const validateRes = baseValidator[rule.type](val)
  if (validateRes && validateRes.errCode) {
    return false
  }
  return true
}

function isMatchArrayType(arr, rule) {
  if (getType(arr) !== 'array') {
    return false
  }
  if (rule.children && rule.children.length && arr.some(item => !isMatchUnionType(item, rule))) {
    return false
  }
  return true
}

function isEmpty(value) {
  return value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim() === '')
}

class Validator {
  constructor() {
    this.baseValidator = baseValidator
    this.customValidator = Object.create(null)
  }

  mixin(type, handler) {
    this.customValidator[type] = handler
  }

  getRealBaseValidator(type) {
    return this.customValidator[type] || this.baseValidator[type]
  }

  get validator() {
    return new Proxy({}, {
      get: (_, prop) => {
        if (typeof prop !== 'string') {
          return
        }
        const realBaseValidator = this.getRealBaseValidator(prop)
        if (realBaseValidator) {
          return realBaseValidator
        }
        const rule = parseValidatorName(prop)
        return function (val) {
          if (!isMatchUnionType(val, rule)) {
            return {
              errCode: ERROR.INVALID_PARAM
            }
          }
        }
      }
    })
  }

  validate(value = {}, schema = {}) {
    for (const schemaKey in schema) {
      let schemaValue = schema[schemaKey]
      if (getType(schemaValue) === 'string') {
        schemaValue = {
          required: true,
          type: schemaValue
        }
      }
      const {
        required,
        type
      } = schemaValue
      // value内未传入了schemaKey或对应值为undefined
      if (isEmpty(value[schemaKey])) {
        if (required) {
          return {
            errCode: ERROR.PARAM_REQUIRED,
            errMsgValue: {
              param: schemaKey
            },
            schemaKey
          }
        } else {
          //delete value[schemaKey]
          continue
        }
      }
      const validateMethod = this.validator[type]
      if (!validateMethod) {
        throw new Error(`invalid schema type: ${type}`)
      }
      const validateRes = validateMethod(value[schemaKey])
      if (validateRes) {
        validateRes.schemaKey = schemaKey
        return validateRes
      }
    }
  }
}

module.exports = Validator
