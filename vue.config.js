const fs = require('fs')
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Blog Reader'
        return args
      })
  }
}
