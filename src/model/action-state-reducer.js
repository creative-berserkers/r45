import {shallowEqual} from '../utils'
import * as clientActionReducers from './states'

const CLIENT_STATE_ENTER_PUSH = 'CLIENT_STATE_ENTER_PUSH'
const CLIENT_STATE_POP = 'CLIENT_STATE_POP'
const CLIENT_STATE_ENTER_REPLACE = 'CLIENT_STATE_ENTER_REPLACE'

export function pushStateAction(guid, name, initialState){
  return {
    type: CLIENT_STATE_ENTER_PUSH ,
    guid: guid,
    name: name,
    initialState : initialState
  }
}

export function popStateAction(guid) {
  return {
    type: CLIENT_STATE_POP,
    guid: guid
  }
}

export function setStateAction(guid, name){
  return {
    type : CLIENT_STATE_ENTER_REPLACE,
    guid : guid,
    name : name
  }
}

export default function actionStateReducer(state = [], action) {
  switch (action.type) {
    case CLIENT_STATE_ENTER_PUSH :
      return state.concat(clientActionReducers[action.name](undefined, action))
    case CLIENT_STATE_POP :
      return state.slice(0,state.length-1)
    case CLIENT_STATE_ENTER_REPLACE :
      return state.slice(0,state.length-1).concat(clientActionReducers[action.name](undefined, {type:'@INIT@'}))
    default :{
      if(state.length === 0) return state
      const topState = state[state.length - 1]
      const topStateName = topState.name
      const reducer = clientActionReducers[topStateName]
      if(reducer){
        const newTopState = reducer(topState, action)
        if(shallowEqual(topState, newTopState)){
          return state
        } else {
          return state.slice(0,state.length-1).concat(newTopState)
        }
      }
      return state
    }
  }
}