const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('../../webpack.client.config')

const compiler = webpack(webpackConfig)
const app = express()

app.use(webpackDevMiddleware(compiler,{
  noInfo: false,
  quiet:false,
  stats: {
    assets: true,
    colors: true,
    version: true,
    hash: true,
    timings: true,
    chunks: true,
    chunkModules: true
  },
  extensions: ['.ts', '.tsx', '.js'],
  publicPath: webpackConfig.output.publicPath,

}))

app.use(webpackHotMiddleware(compiler, {
  noInfo: false,
  quiet:false,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}))

//app.use(express.static('public'))

app.listen(8080,function () {
  console.log('UI listening on port 8080!')
})


