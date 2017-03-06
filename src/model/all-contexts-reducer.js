import contextReducer from './context-reducer'

export const CONTEXT_SPAWNED = 'CONTEXT_SPAWNED'
export const CONTEXT_DESPAWNED = 'CONTEXT_DESPAWNED'
export const CONTEXT_ACTION = 'CONTEXT_ACTION'

export function contextAction(guid, action){
  return {
    type : CONTEXT_ACTION,
    guid : guid,
    action : action
  }
}

/**
 * @param {string} guid
 * @returns {{type: string, guid: string|undefined}}
 */
export function contextSpawnedAction(guid) {
  return {
    type: CONTEXT_SPAWNED,
    guid: guid
  }
}

export function contextDespawnedAction(guid){
  return {
    type: CONTEXT_DESPAWNED,
    guid: guid
  }
}

export function getContext(state, guid){
  return state.contexts[guid]
}

export default function allContextsReducer(state = {}, action){
  switch(action.type){
    case CONTEXT_SPAWNED: return {...state, [action.guid]: contextReducer(state[action.guid], action)}
    case CONTEXT_DESPAWNED: return {...state, [action.guid]: contextReducer(state[action.guid], action)}
    case CONTEXT_ACTION: return {...state, [action.guid]: contextReducer(state[action.guid], action.action)}
    default : return state
  }
}

