import {shallowEqual} from '../../utils'
import log from '../log'
import {Action} from "redux";
import Socket = SocketIO.Socket;

export interface GuidToSocketMap {
  [key:string] : Socket
}

export default function serverMiddleware(clientGuidToSocket:GuidToSocketMap, getControllerSocket:()=>Socket, {getState}:{getState:()=>any}) {
  return (next:(action:Action)=>any) => (action:Action) => {
    log.info(`Action ${JSON.stringify(action)}`)

    const stateBefore = getState()
    const result = next(action)
    const stateAfter = getState()

    const stateChanged = !shallowEqual(stateBefore, stateAfter)
    if(stateChanged){
      Object.keys(stateAfter.contexts).forEach((key) => {

        const targetSocket = clientGuidToSocket[key]
        if (targetSocket) {
          log.info(`Sending to ${key} action: ${JSON.stringify(action)}`)
          targetSocket.emit('action', action)
        } else {
          log.warn(`Client ${key} disconnected and is not receiving state changes`)
        }
      })
    }
    getControllerSocket().emit('state-action', {
      state: stateAfter,
      action : action
    })
    return result
  }
}