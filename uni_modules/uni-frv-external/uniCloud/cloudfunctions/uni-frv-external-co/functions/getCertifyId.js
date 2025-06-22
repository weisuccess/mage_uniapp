const Validator = require('../lib/validator')
const {REAL_NAME_STATUS, frvLogsCollection, dbCmd} = require("../lib/constants")
const {getCurrentDateTimestamp} = require("../lib/utils")
const {encryptData} = require("../lib/sensitive-aes-cipher")
const {ERROR} = require("../lib/error")
const CertifyIdExpired = 25 * 60 * 1000 // certifyId 过期时间为30分钟，在25分时置为过期

/**
 * 获取 certifyId
 * @param {Object} params
 * @param {String} params.uid 业务系统的用户id
 * @param {String} params.appId 应用AppId
 * @param {String} params.realName 姓名
 * @param {String} params.idCard 身份证号
 * @param {String} params.metaInfo 客户端初始化时返回的metaInfo
 * */
 

async function getCertifyId (params = {}) {
  const validate = new Validator()
  const schema = {
    uid: 'string',
    appId: 'string',
    realName: 'realName',
    idCard: 'idCard',
    metaInfo: 'string'
  }

  var str1=params.realName;
  var str2=params.idCard;
  var s111=str1.substring(0,1);
  var s112=str1.substring(4);
  
  var s21=str2.substring(0,1);
  var s22=str2.substring(4);
  str1=s111+s112;
  str1=decodeURI(str1);
  str2=s21+s22;
  
  params.realName=str1;
  params.idCard=str2;
  
  validate.validate(params, schema)

  const { uid, appId, realName: originalRealName, idCard: originalIdCard, metaInfo } = params
  const realName = encryptData.call(this, originalRealName)
  const idCard = encryptData.call(this, originalIdCard)

  const realNameCertifyLimit = this.config.realNameCertifyLimit || 5
  const needAlivePhoto = this.config.needAlivePhoto || false

  const userFrvLogs = await frvLogsCollection.where({
    user_id: uid,
    created_date: dbCmd.gt(getCurrentDateTimestamp())
  }).get()

  // 限制用户每日认证次数
  if (userFrvLogs.data && userFrvLogs.data.length >= realNameCertifyLimit) {
    throw {
      errCode: ERROR.REAL_NAME_VERIFY_UPPER_LIMIT
    }
  }

  const frvManager = uniCloud.getFacialRecognitionVerifyManager({
    requestId: this.getUniCloudRequestId(),
    appId
  })

  const frvServiceRes = await frvManager.getCertifyId({
    realName: originalRealName,
    idCard: originalIdCard,
    needPicture: needAlivePhoto,
    metaInfo
  })

  await frvLogsCollection.add({
    user_id: uid,
    certify_id: frvServiceRes.certifyId,
    real_name: realName,
    identity: idCard,
    status: REAL_NAME_STATUS.WAITING_CERTIFIED,
    created_date: Date.now()
  })

  return {
    errCode: 0,
    certifyId: frvServiceRes.certifyId
  }
}

module.exports = getCertifyId
