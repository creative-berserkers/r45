import * as actionStateHandlers from './../states'
import log from '../log'
import {clientSelector} from '../../model/global-reducer'
import {
  actionStateCountSelector,
  currentActionStateNameSelector,
  currentActionStateSelector
} from '../../model/context-reducer'

export default function serverMiddleware({getState, dispatch}) {
  return (next) => (action) => {
    if (action.type === 'CONTEXT_SPAWNED') {
      const result = next(action)
      if (actionStateCountSelector(clientSelector(getState(), action.guid)) === 0) {
        dispatch({
          type: 'CLIENT_STATE_ENTER_PUSH',
          guid: action.guid,
          name: 'introduction'
        })
      }
      return result
    } else if (action.type === 'CLIENT_STATE_ENTER_PUSH' || action.type === 'CLIENT_STATE_ENTER_REPLACE') {
      const result = next(action)
      if (actionStateCountSelector(clientSelector(getState(), action.guid)) > 0) {
        const name = currentActionStateNameSelector(clientSelector(getState(), action.guid))
        log.info(`${action.guid} entering state ${name}`)
        if (actionStateHandlers[name].onEnter) {
          actionStateHandlers[name].onEnter(action.guid, getState, dispatch)
        }
      }
      return result
    } else if (action.type === 'CLIENT_STATE_POP') {
      const fromStateName = currentActionStateNameSelector(clientSelector(getState(), action.guid))
      const fromStateInternalState = currentActionStateSelector(clientSelector(getState(), action.guid))
      const result = next(action)
      if (actionStateCountSelector(clientSelector(getState(), action.guid)) > 0) {
        const name = currentActionStateNameSelector(clientSelector(getState(), action.guid))
        log.info(`${action.guid} returning from ${fromStateName} state  to ${name} state`)
        if (actionStateHandlers[name].onReturn) {
          actionStateHandlers[name].onReturn(action.guid, getState, dispatch, fromStateName, fromStateInternalState)
        }
      }
      return result
    } else if (action.type === 'COMMAND_REQUEST') {
      if (actionStateCountSelector(clientSelector(getState(), action.guid)) > 0) {
        const name = currentActionStateNameSelector(clientSelector(getState(), action.guid))
        actionStateHandlers[name].onCommand(action.guid, getState, dispatch, action.command)
      }
    } else {
      return next(action)
    }
  }
}