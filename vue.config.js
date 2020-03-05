const fs = require('fs')
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    https: {
      key: fs.readFileSync('./src/assets/certs/rootSSL.key'),
      cert: fs.readFileSync('./src/assets/certs/rootSSL.pem'),
      passphrase: 'mciot'
    }
  },
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Blog Reader'
        return args
      })
  }
}
