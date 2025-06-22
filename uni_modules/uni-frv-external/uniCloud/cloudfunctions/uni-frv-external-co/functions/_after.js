const {isUniIdError} = require("../lib/error")

function After (error, result) {
  if (error) {
    // 处理中间件内抛出的标准响应对象
    if (error.errCode) {
      const errCode = error.errCode
      if (!isUniIdError(errCode)) {
        return error
      }
      return {
        errCode,
        errMsg: error.errMsg || this.t(errCode, error.errMsgValue)
      }
    }
    throw error
  }

  return result
}

module.exports = After
