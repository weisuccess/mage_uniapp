const Validator = require("../lib/validator");
const {frvLogsCollection, REAL_NAME_STATUS} = require("../lib/constants");
const {catchAwait} = require("../lib/utils");
const {ERROR} = require("../lib/error");
const {decryptData} = require("../lib/sensitive-aes-cipher");

/**
 * 查询认证结果
 * @param {Object} params
 * @param {String} params.certifyId
 * */
async function getAuthResult (params) {
  const validate = new Validator()
  const schema = {
    appId: 'string',
    certifyId: 'string'
  }

  validate.validate(params, schema)

  const {certifyId, appId} = params

  // 验证 certifyId 状态 已认证/认证失败的直接返回
  const frvLogRes = await frvLogsCollection.where({
    certify_id: certifyId
  }).get()

  const frvLog = frvLogRes.data && frvLogRes.data[0]

  if (!frvLog) {
    throw {
      errCode: ERROR.CERTIFY_ID_NOT_EXIST
    }
  }

  if (frvLog.status === REAL_NAME_STATUS.CERTIFIED || frvLog.status === REAL_NAME_STATUS.CERTIFY_FAILED) {
    throw {
      errCode: ERROR.CERTIFY_ID_USED
    }
  }

  const frvManager = uniCloud.getFacialRecognitionVerifyManager({
    requestId: this.getUniCloudRequestId(),
    appId
  })

  const [error, res] = await catchAwait(frvManager.getAuthResult({
    certifyId
  }))

  if (error) {
    console.log(ERROR.UNKNOWN_ERROR, 'error: ', error)
    throw error
  }

  if (res.authState === 'PROCESSING') {
    throw {
      errCode: ERROR.FRV_PROCESSING
    }
  }

  if (res.authState === 'FAIL') {
    await frvLogsCollection.where({
      certify_id: certifyId
    }).update({
      status: REAL_NAME_STATUS.CERTIFY_FAILED
    })

    throw {
      errCode: ERROR.FRV_FAIL
    }
  }

  if (res.authState !== 'SUCCESS') {
    console.log(ERROR.UNKNOWN_ERROR, 'source res: ', res)
    throw {
      errCode: ERROR.UNKNOWN_ERROR
    }
  }

  const result = {
    errCode: 0,
    uid: frvLog.user_id,
    status: REAL_NAME_STATUS.CERTIFIED,
    realName: decryptData.call(this, frvLog.real_name),
    idCard: decryptData.call(this, frvLog.identity)
  }

  if (res.pictureUrl) {
    const pictureRes = await uniCloud.httpclient.request(res.pictureUrl)
    if (pictureRes.status < 400) {
      result.photo = pictureRes.data.toString('base64')
    }
  }

  await frvLogsCollection.where({
    certify_id: certifyId
  }).update({
    status: REAL_NAME_STATUS.CERTIFIED
  })

  return result
}

module.exports = getAuthResult
