import * as actionStateHandlers from './../states'

export default function serverMiddleware({ getState, dispatch }) {
  return (next) => (action) => {
    if(action.type === 'CONTEXT_SPAWNED'){
      if(getState().contexts[action.guid].shared.actionState.length === 0){
        dispatch({
          type: 'CLIENT_STATE_ENTER_PUSH',
          guid: action.guid,
          name: 'introduction'
        })
      }
    } else if(action.type === 'CLIENT_STATE_ENTER_PUSH' || action.type === 'CLIENT_STATE_ENTER_REPLACE') {
      const prevActionState = getState().contexts[action.guid].shared.actionState
      if (prevActionState.length > 0) {
        const name = prevActionState[prevActionState.length - 1]
        actionStateHandlers[name].onLeave(action.guid, getState(), dispatch)
      }
      const result = next(action)
      const currActionState = getState().contexts[action.guid].shared.actionState
      if (currActionState.length > 0) {
        const name = currActionState[currActionState.length - 1]
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