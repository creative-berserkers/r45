const winston = require('winston')
const path = require('path')

const pwd = process.env.PWD || process.cwd()

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: path.join(pwd, 'data/server.log')})
  ]
})

export default {
  debug(...args:any[]){
    logger.debug(...args)
  },
  info(...args:any[]){
    logger.info(...args)
  },
  warn(...args:any[]){
    logger.warn(...args)
  },
  error(...args:any[]){
    logger.error(...args)
  }
}