//import 'source-map-support/register'
import * as express from 'express'
import * as http from 'http'
import *as socketIO from 'socket.io'

import log from './log'
import serverIO from './server-io'

const app = express()
const host = '0.0.0.0'
const port:number = Number(process.env.PORT)  || 9010


const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', serverIO)

server.listen(port, host, function(err:Error) {
  if (err) log.error(err)
  else {
    log.info(`Listening  at http://${host}:${port}`)
  }
})
