import * as clientStateHandlers from './../states'
import {CLIENT_SPAWNED, clientSelector, CLIENT_ACTION, clientAction} from '../../model/server-reducer'
import {
  CLIENT_STATE_PUSH,
  CLIENT_STATE_POP,
  currentClientStateNameSelector,
  pushClientStateAction
} from '../../model/client-reducer'
import {SETUP} from '../../model/states/setup'

export default function serverMiddleware({getState, dispatch}) {
  return (next) => (action) => {
    if(action.type === CLIENT_SPAWNED){
      const result = next(action.action)
      if (clientSelector(getState(), action.guid).length === 0) {
        dispatch(clientAction(action.guid, pushClientStateAction(SETUP, {})))
      }
      return result
    }
    if (action.type === CLIENT_ACTION) {
      switch (action.action.type) {
        case CLIENT_STATE_PUSH : {
          let fromState = undefined
          if (clientSelector(getState(), action.guid).length > 0) {
            fromState = currentClientStateNameSelector(clientSelector(getState(), action.guid))
          }
          const result = next(action.action)
          const name = currentClientStateNameSelector(clientSelector(getState(), action.guid))
          clientStateHandlers[name].onEnter(getState, dispatch, next, {...action, fromState})
          return result
        }
        case CLIENT_STATE_POP : {
          const fromState = currentClientStateNameSelector(clientSelector(getState(), action.guid))
          const result = next(action.action)
          if (clientSelector(getState(), action.guid).length > 0) {
            const name = currentClientStateNameSelector(clientSelector(getState(), action.guid))
            clientStateHandlers[name].onReturn(getState, dispatch, next, {...action, fromState})
          }
          return result
        }
        default : {
          const name = currentClientStateNameSelector(clientSelector(getState(), action.guid))
          return clientStateHandlers[name].onAction(getState, dispatch, next, action)
        }
      }
    } else {
      return next(action)
    }
  }
}