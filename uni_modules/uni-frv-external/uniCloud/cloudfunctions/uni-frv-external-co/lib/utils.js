function getType (val) {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
}

function checkIdCard (idCardNumber) {
  if (!idCardNumber || typeof idCardNumber !== 'string') return false

  const coefficient = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const checkCode = [1, 0, 'x', 9, 8, 7, 6, 5, 4, 3, 2]
  const code = idCardNumber.substring(17)

  let sum = 0
  for (let i = 0; i < 17; i++) {
    sum += Number(idCardNumber.charAt(i)) * coefficient[i]
  }

  return checkCode[sum % 11].toString() === code.toLowerCase()
}

function catchAwait (fn, finallyFn) {
  if (!fn) return [new Error('no function')]

  if (Promise.prototype.finally === undefined) {
    // eslint-disable-next-line no-extend-native
    Promise.prototype.finally = function (finallyFn) {
      return this.then(
        res => Promise.resolve(finallyFn()).then(() => res),
        error => Promise.resolve(finallyFn()).then(() => { throw error })
      )
    }
  }

  return fn
    .then((data) => [undefined, data])
    .catch((error) => [error])
    .finally(() => typeof finallyFn === 'function' && finallyFn())
}

function getCurrentDateTimestamp (date = Date.now(), targetTimezone = 8) {
  const oneHour = 60 * 60 * 1000
  return parseInt((date + targetTimezone * oneHour) / (24 * oneHour)) * (24 * oneHour) - targetTimezone * oneHour
}

module.exports = {
  getType,
  checkIdCard,
  catchAwait,
  getCurrentDateTimestamp
}
