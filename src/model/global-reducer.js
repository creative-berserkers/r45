import sharedContextReducer from './context-reducer'
import {combineReducers} from 'redux'
import {changed} from '../utils'

export function clientSelector(rootState, guid){
  return rootState.contexts[guid].shared
}

const initialState = {
  connected : false,
  shared : sharedContextReducer(undefined, {type:'@INIT@'})
}

function clientContextReducer(state = initialState, action){
  switch (action.type){
    case 'CONTEXT_SPAWNED': return {
      shared : sharedContextReducer(state.shared, action),
      connected: true
    }
    case 'CONTEXT_DESPAWNED': return {
      shared: sharedContextReducer(state.shared, action),
      connected: false
    }
    default : return changed(state, {
      ...state,
      shared : sharedContextReducer(state.shared, action)
    })
  }
}

function allContextsReducer(state = {}, action){
  switch(action.type){
    case 'CONTEXT_SPAWNED': return {...state, [action.guid]: clientContextReducer(state[action.guid], action)}
    case 'CONTEXT_DESPAWNED': return {...state, [action.guid]: clientContextReducer(state[action.guid], action)}
    default : return changed(state, Object.keys(state).reduce((newState, context) => {
      if(action.guid){
        if(!context) throw Error('Should not be null')
        if(action.guid === context){
          newState[context] = clientContextReducer(state[context], action)
        } else {
          newState[context] = state[context]
        }
      } else {
        newState[context] = clientContextReducer(state[context], action)
      }

      return newState
    }, {}))
  }
}

export default combineReducers({
  contexts : allContextsReducer
})
