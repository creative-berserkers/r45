import express from 'express'
import path from 'path'
import http from 'http'
import socketIO from 'socket.io'

import log from './log'
import serverIO from './server-io'

const app = express()
const port = process.env.PORT || 8080

app.use('/static', express.static('public'))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', serverIO.bind(undefined, io))

server.listen(port, 'localhost', function(err) {
  if (err) log.error(err)
  else {
    log.info(`Listening at http://localhost:${port}`)
  }
})
