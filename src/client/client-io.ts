import guid from '../utils/guid'
import log from './log'
import * as io from 'socket.io-client'
import {Action, Dispatch, Middleware, MiddlewareAPI, StoreEnhancer} from "redux";

export function getClientGuid(){
  let authToken = localStorage.getItem('auth-token')
  if (!authToken) {
    authToken = guid()
    localStorage.setItem('auth-token', authToken)
  }
  return authToken
}

export const commandMiddleware: Middleware = <S>({ dispatch, getState }:MiddlewareAPI<S>) => {
  const socket = io('http://localhost:9090/', { autoConnect: false, reconnection: false })

  socket.io.autoConnect

  return (next:Dispatch<S>) => {
    socket.on('connect', () => {
      log.info('connected')
      socket.emit('authentication', getClientGuid())
    })

    socket.on('state_sync', (state:any) => {
      log.info('state_sync', state)
      //next(loadStateAction(state))
    })

    socket.on('action', (action:Action) => {
      log.info('dispatched', JSON.stringify(action, undefined, 2))
      log.info('state before',getState())
      next(action)
      log.info('state after',getState())
    })

    socket.on('connect_error', () => {
      console.log('Sorry, there seems to be an issue with the connection!');
    })

    return <A extends Action>(action:A):any => {
      const actionJSON = JSON.stringify(action)
      log.info(`Action: ${actionJSON}`)
      socket.emit('command_request', action)
      return {}
    }
  }
}
