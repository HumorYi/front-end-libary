const { isProduction } = require('./env')

const plugins = []

if (isProduction) {
  plugins.push('transform-remove-console')
}

module.exports = function (api) {
  api.cache(true)

  return {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins
  }
}
