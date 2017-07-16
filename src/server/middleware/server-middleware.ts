//import * as clientStateHandlers from './../states'

//import {SETUP} from '../../model/states/setup'
//import {CONTEXT_ACTION, CONTEXT_SPAWNED, contextAction} from '../../model/all-contexts-reducer'
/*import {
  getLastStackState,
  getLastStackStateName, getStack, pushClientStateAction, STACK_POP,
  STACK_PUSH
} from '../../model/context-reducer'*/
import log from '../log'
//import {getContext} from '../../model/index'
import {Action} from "redux";

export default function serverMiddleware({getState, dispatch}:any) {
  return (next:(action:Action)=>any) => (action:Action) => {
    /*if (action.type === CONTEXT_SPAWNED) {
      if (getStack(getContext(getState(), action.guid)).length === 0) {
        const result = next(action)
        clientStateHandlers['init'].onEnter(getState, dispatch, next, {...action, fromState: 'none'})
        return result
      }
    }
    if (action.type === CONTEXT_ACTION) {
      switch (action.action.type) {
        case STACK_PUSH : {
          let fromState = undefined
          if (getStack(getContext(getState(), action.guid)).length > 0) {
            fromState = getLastStackStateName(getContext(getState(), action.guid))
          }
          const result = next(action)
          const name = getLastStackStateName(getContext(getState(), action.guid))
          clientStateHandlers[name].onEnter(getState, dispatch, next, {...action, fromState})
          return result
        }
        case STACK_POP : {
          const fromState = getLastStackState(getContext(getState(), action.guid))
          const result = next(action)
          const stack = getStack(getContext(getState(), action.guid))
          if (stack.length > 0) {
            const name = getLastStackStateName(getContext(getState(), action.guid))
            clientStateHandlers[name].onReturn(getState, dispatch, next, {...action.action, fromState, guid: action.guid})
          }
          return result
        }
        default : {
          const name = getLastStackStateName(getContext(getState(), action.guid))
          const handler = clientStateHandlers[name]
          if(handler){
            handler.onAction(getState, dispatch, next, action)
          } else {
            log.warn(`Couldn't find action handler '${name}' for processing:`, action)
          }
          return
        }
      }
    }*/
    return next(action)
  }
}