import * as clientStateHandlers from './../states'

import {SETUP} from '../../model/states/setup'
import {getContext, CONTEXT_ACTION, CONTEXT_SPAWNED, contextAction} from '../../model/all-contexts-reducer'
import {getLastStackStateName, pushClientStateAction, STACK_POP, STACK_PUSH} from '../../model/context-reducer'

export default function serverMiddleware({getState, dispatch}) {
  return (next) => (action) => {
    if (action.type === CONTEXT_SPAWNED) {
      const result = next(action)
      if (getContext(getState(), action.guid).length === 0) {
        dispatch(contextAction(action.guid, pushClientStateAction(SETUP, {})))
      }
      return result
    }
    if (action.type === CONTEXT_ACTION) {
      switch (action.action.type) {
        case STACK_PUSH : {
          let fromState = undefined
          if (getContext(getState(), action.guid).length > 0) {
            fromState = getLastStackStateName(getContext(getState(), action.guid))
          }
          const result = next(action.action)
          const name = getLastStackStateName(getContext(getState(), action.guid))
          clientStateHandlers[name].onEnter(getState, dispatch, next, {...action, fromState})
          return result
        }
        case STACK_POP : {
          const fromState = getLastStackStateName(getContext(getState(), action.guid))
          const result = next(action.action)
          if (getContext(getState(), action.guid).length > 0) {
            const name = getLastStackStateName(getContext(getState(), action.guid))
            clientStateHandlers[name].onReturn(getState, dispatch, next, {...action, fromState})
          }
          return result
        }
        default : {
          const name = getLastStackStateName(getContext(getState(), action.guid))
          return clientStateHandlers[name].onAction(getState, dispatch, next, action)
        }
      }
    } else {
      return next(action)
    }
  }
}