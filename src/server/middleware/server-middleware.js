import * as actionStateHandlers from './../states'
import log from '../log'

export default function serverMiddleware({ getState, dispatch }) {
  return (next) => (action) => {
    if(action.type === 'CONTEXT_SPAWNED'){
      const result = next(action)
      if(getState().contexts[action.guid].shared.actionState.length === 0){
        dispatch({
          type: 'CLIENT_STATE_ENTER_PUSH',
          guid: action.guid,
          name: 'introduction'
        })
      }
      return result
    } else if(action.type === 'CLIENT_STATE_ENTER_PUSH' || action.type === 'CLIENT_STATE_ENTER_REPLACE') {
      const result = next(action)
      const currActionState = getState().contexts[action.guid].shared.actionState
      if (currActionState.length > 0) {
        const name = currActionState[currActionState.length - 1]
        log.info(`${action.guid} entering state ${name}`)
        actionStateHandlers[name].onEnter(action.guid, getState(), dispatch)
      }
      return result
    } else if(action.type === 'COMMAND_REQUEST'){
      const currActionState = getState().contexts[action.guid].shared.actionState
      if (currActionState.length > 0) {
        const name = currActionState[currActionState.length - 1]
        actionStateHandlers[name].onCommand(action.guid, getState(), dispatch, action.command)
      }
    } else {
      return next(action)
    }
  }
}