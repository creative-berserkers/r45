import guid from '../utils/guid'
import log from './log'
import {loadStateAction} from '../model/index'

export function getClientGuid(){
  let authToken = localStorage.getItem('auth-token')
  if(!authToken){
    authToken = guid()
    localStorage.setItem('auth-token', authToken)
  }
  return authToken
}

export default function command({ dispatch }) {
  const socket = io()

  socket.on('connect', function onConnect(){
    log.info('connected')
    socket.emit('authentication', getClientGuid())
  })

  socket.on('initial_state', function onInitialState(state){
    log.info('initial_state', state)
    dispatch(loadStateAction(state))
  })

  socket.on('action', function onAction(action){
    dispatch(action)
  })

  return (next) => (action) => {
    const actionJSON = JSON.stringify(action)
    log.info(`Action: ${actionJSON}`)
    socket.emit('command_request', action)
    return {}
  }
}
