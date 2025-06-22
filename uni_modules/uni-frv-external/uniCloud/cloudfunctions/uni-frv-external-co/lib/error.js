const ERROR = {
  PARAM_REQUIRED: 'uni-frv-param-required',
  INVALID_PARAM: 'uni-frv-invalid-param',
  FRV_FAIL: 'uni-frv-fail',
  FRV_PROCESSING: 'uni-frv-processing',
  REAL_NAME_VERIFIED: 'uni-realname-verified',
  ID_CARD_EXISTS: 'uni-frv-idcard-exists',
  INVALID_ID_CARD: 'uni-frv-invalid-idcard',
  INVALID_REAL_NAME: 'uni-frv-invalid-realname',
  UNKNOWN_ERROR: 'uni-frv-unknown-error',
  REAL_NAME_VERIFY_UPPER_LIMIT: 'uni-frv-realname-verify-upper-limit',
  CONFIG_FIELD_REQUIRED: 'uni-frv-config-field-required',
  CONFIG_FIELD_INVALID: 'uni-frv-config-field-invalid',
  CERTIFY_ID_NOT_EXIST: 'uni-frv-certify-id-not-exist',
  CERTIFY_ID_USED: 'uni-frv-certify-id-used',
  ILLEGAL_REQUEST: 'uni-frv-illegal-request'
}

function isUniIdError (errCode) {
  return Object.values(ERROR).includes(errCode)
}

class UniCloudError extends Error {
  constructor (options) {
    super(options.message)
    this.errMsg = options.message || ''
    this.errCode = options.code
  }
}

module.exports = {
  ERROR,
  isUniIdError,
  UniCloudError
}
