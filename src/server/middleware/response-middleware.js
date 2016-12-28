import {shallowEqual} from '../../utils'
import log from '../log'

export default function serverMiddleware(clientGuidToSocket, { getState, dispatch }) {
  return (next) => (action) => {
    log.info(`Action ${JSON.stringify(action)}`)
    const stateBeforeRequest = getState()
    const result = next(action)
    const stateAfterRequest = getState()
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
    return result
  }
}