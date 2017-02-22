import fs from 'fs'
import path from 'path'
import globalReducer, {clientSpawnedAction, clientDespawnedAction, actionRequest} from 'model/server-reducer'
import serverMiddleware from './middleware/server-middleware'
import responseMiddleware from './middleware/response-middleware'
import log from './log'
import {createStore, applyMiddleware} from 'redux'
import {clientAction} from '../model/server-reducer'

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
    store.dispatch(clientSpawnedAction(authToken))
    socket.emit('initial_state', store.getState().contexts[authToken].shared)
  })

  socket.on('disconnect', function() {
    const guid = clientSocketIdToGuid[socket.id]
    log.info(`client ${guid}@${clientId} disconnected`)
    store.dispatch(clientDespawnedAction(guid))
    clientGuidToSocket[guid] = undefined
    clientSocketIdToGuid[socket.id] = undefined
  })

  socket.on('command_request', function(action){
    const guid = clientSocketIdToGuid[socket.id]
    log.info(`client ${guid}@${clientId} action: ${JSON.stringify(action)}`)
    store.dispatch(clientAction(guid,action))
  })
}
