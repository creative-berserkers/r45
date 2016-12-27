import express from 'express'
import path from 'path'
import http from 'http'
import socketIO from 'socket.io'

import log from './log'
import serverIO from './server-io'

const app = express()
const host = '0.0.0.0'
const port = process.env.PORT || 8080

process.env.PWD = process.cwd()

app.use('/static', express.static(path.join(process.env.PWD, 'public')))

app.get('/favicon.ico', function(req, res) {
  res.sendFile(path.join(process.env.PWD, 'public/favicon.ico'))
})

app.get('*', function(req, res) {
  res.sendFile(path.join(process.env.PWD, 'public/index.html'))
})

const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', serverIO.bind(undefined, io))

server.listen(port, host, function(err) {
  if (err) log.error(err)
  else {
    log.info(`Listening at http://${host}:${port}`)
  }
})
