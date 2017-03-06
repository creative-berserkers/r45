import {shallowEqual} from '../../utils'
import log from '../log'
import {getContext} from '../../model/all-contexts-reducer'

export default function serverMiddleware(clientGuidToSocket, {getState}) {
  return (next) => (action) => {
    log.info(`Action ${JSON.stringify(action)}`)

    const stateBefore = getState()
    const result = next(action)
    const stateAfter = getState()

    Object.keys(stateAfter.contexts).forEach((key) => {

      const clientStateBefore = getContext(stateBefore, key)
      const clientStateAfter = getContext(stateAfter, key)

      const stateChanged = !shallowEqual(clientStateBefore, clientStateAfter)
      const targetSocket = clientGuidToSocket[key]
      if (stateChanged && targetSocket) {
        log.info(`Sending to ${key}`)
        targetSocket.emit('action', action)
      }

      if (!targetSocket) {
        log.warn(`Client ${key} disconnected and is not receiving state changes`)
      }
    })
    return result
  }
}