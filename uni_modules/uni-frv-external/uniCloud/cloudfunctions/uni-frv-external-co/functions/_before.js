const uniCloudS2s = require('uni-cloud-s2s')
const { ERROR } = require('../lib/error')
const loadConfig = require('../config')

function Before () {
  const clientInfo = this.getClientInfo()

  this.config = loadConfig()

  // 国际化
  const i18n = uniCloud.initI18n({
    locale: clientInfo.locale || 'zh-Hans',
    fallbackLocale: 'zh-Hans',
    messages: require('../lang/index')
  })
  this.t = i18n.t.bind(i18n)

  if (this.getClientInfo().source !== 'http') {
    throw {
      errCode: ERROR.ILLEGAL_REQUEST
    }
  }

  try {
	this.getParams()[0] = JSON.parse(this.getHttpInfo().body)
  } catch(e) {}
  
  // 兼容URL化
  if (!uniCloudS2s.verifyHttpInfo(this.getHttpInfo())) {
    throw {
      errCode: ERROR.ILLEGAL_REQUEST
    }
  }
}

module.exports = Before
