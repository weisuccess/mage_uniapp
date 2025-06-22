const createConfig = require('uni-config-center')
let config

function loadConfig () {
  if (config) return config

  const shareConfig = createConfig({
    pluginId: 'uni-frv-external-co'
  })

  config = shareConfig.config()

  return config
}

module.exports = loadConfig
