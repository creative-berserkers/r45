import fs from 'fs'
import path from 'path'
import globalReducer from 'model/global-reducer'
import chatActionHandler from '../action-handlers/chat'
import log from './log'
import {shallowEqual} from './utils'

const Redux = require('redux')
const dataDirPath = path.join(__dirname, 'data')
const stateFilePath = path.join(__dirname, 'data/state.json')

if (!fs.existsSync(dataDirPath)){
  fs.mkdirSync(dataDirPath)
}
let stateStr = '{}'
try {
  stateStr = fs.readFileSync(stateFilePath, 'utf8')
} catch(e) {
  log.error('Problem with reading state file',e)
  fs.writeFileSync(stateFilePath, '{}', { flag: 'wx' })
}

if(stateStr.trim().length === 0) stateStr = '{}'
const store = Redux.createStore(globalReducer, JSON.parse(stateStr))

store.subscribe(function persistState(){
  const currentState = store.getState()
  fs.writeFile(stateFilePath, JSON.stringify(currentState, null, 2), function(err) {
    if(err) {
      return log.error(err)
    }
  })
})

const clientSocketIdToGuid = {}
const clientGuidToSocket = {}

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
      id: clientSocketIdToGuid[socket.id]
    })
    socket.emit('initial_state', store.getState().contexts[authToken].shared)
  })

  socket.on('disconnect', function() {
    log.info(`client ${clientSocketIdToGuid[socket.id]}@${clientId} disconnected`)
    store.dispatch({
      type: 'CONTEXT_DESPAWNED',
      id: clientSocketIdToGuid[socket.id]
    })
    clientGuidToSocket[clientSocketIdToGuid[socket.id]] = undefined
    clientSocketIdToGuid[socket.id] = undefined
  })

  socket.on('command_request', function(action){
    if(action.type !== 'COMMAND_REQUEST') return
    log.info(`client ${clientSocketIdToGuid[socket.id]}@${clientId} command:${JSON.stringify(action.command)}`)

    chatActionHandler(store.getState(), {
      type: action.type,
      command: action.command,
      origin : clientSocketIdToGuid[socket.id]
    }, (action)=>{
      log.info(`dispatching ${JSON.stringify(action)}`)
      const stateBeforeRequest = store.getState()
      store.dispatch(action)
      const stateAfterRequest = store.getState()
      Object.keys(stateBeforeRequest.contexts).forEach((key) => {

        const stateChanged = !shallowEqual(stateBeforeRequest.contexts[key].shared, stateAfterRequest.contexts[key].shared)
        const targetSocket = clientGuidToSocket[key]
        if(stateChanged){
          log.info(`After ${action.type} state for ${key} changed, sending action`)
          targetSocket.emit('action', action)
        } else {
          log.info(`After ${action.type} state for ${key} is same`)
        }
      })

    })

  })
}
