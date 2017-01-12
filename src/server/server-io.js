import fs from 'fs'
import path from 'path'
import globalReducer from 'model/global-reducer'
import serverMiddleware from './middleware/server-middleware'
import responseMiddleware from './middleware/response-middleware'
import log from './log'
import {createStore, applyMiddleware} from 'redux'

const dataDirPath = path.join(__dirname, 'data')
const stateFilePath = path.join(__dirname, 'data/state.json')

const clientSocketIdToGuid = {}
const clientGuidToSocket = {}

if (!fs.existsSync(dataDirPath)){
  fs.mkdirSync(dataDirPath)
}
let stateStr = '{}'
try {
  stateStr = fs.readFileSync(stateFilePath, 'utf8')
} catch(e) {
  fs.writeFileSync(stateFilePath, '{}', { flag: 'wx' })
}

if(stateStr.trim().length === 0) stateStr = '{}'
const store = createStore(globalReducer, JSON.parse(stateStr), applyMiddleware(serverMiddleware,responseMiddleware.bind(undefined,clientGuidToSocket)))

store.subscribe(function persistState(){
  const currentState = store.getState()
  if(currentState === undefined){
    log.warn('Saving empty state.')
  } else {
    fs.writeFileSync(stateFilePath, JSON.stringify(currentState, null, 2))
  }
})

export default function onSocket(io, socket){
  const ipAddress = socket.request.connection.remoteAddress
  const clientId = `${ipAddress}`
  log.info(`client ??@${clientId} connected`)

  socket.on('authentication', function(authToken){
    clientSocketIdToGuid[socket.id] = authToken
    clientGuidToSocket[authToken] = socket
    log.info(`client ??@${clientId} authenticated as ${authToken}`)
    store.dispatch({
      type: 'CONTEXT_SPAWNED',
      guid: authToken
    })
    socket.emit('initial_state', store.getState().contexts[authToken].shared)
  })

  socket.on('disconnect', function() {
    log.info(`client ${clientSocketIdToGuid[socket.id]}@${clientId} disconnected`)
    store.dispatch({
      type: 'CONTEXT_DESPAWNED',
      guid: clientSocketIdToGuid[socket.id]
    })
    clientGuidToSocket[clientSocketIdToGuid[socket.id]] = undefined
    clientSocketIdToGuid[socket.id] = undefined
  })

  socket.on('command_request', function(action){
    if(action.type !== 'COMMAND_REQUEST') return
    log.info(`client ${clientSocketIdToGuid[socket.id]}@${clientId} command:${JSON.stringify(action.command)}`)
    store.dispatch({
      type: action.type,
      guid: clientSocketIdToGuid[socket.id],
      command: action.command
    })
  })
}
