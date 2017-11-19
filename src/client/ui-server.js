const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('../../webpack.client.config')

const compiler = webpack(webpackConfig)
const app = express()

app.use(webpackDevMiddleware(compiler,{
  noInfo: false,
  publicPath: '/',

}))

app.use(webpackHotMiddleware(compiler))

//app.use(express.static('public'))

app.listen(8080,function () {
  console.log(`Public path: ${webpackConfig.output.publicPath}`)
  console.log('UI listening on port 8080!')
})


