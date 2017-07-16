//import contextReducer, {ContextState} from './context-reducer'
import {Action} from "redux";

export type CONTEXT_SPAWNED = 'CONTEXT_SPAWNED'
export const CONTEXT_SPAWNED:CONTEXT_SPAWNED = 'CONTEXT_SPAWNED'

export type CONTEXT_DESPAWNED = 'CONTEXT_DESPAWNED'
export const CONTEXT_DESPAWNED:CONTEXT_DESPAWNED = 'CONTEXT_DESPAWNED'

export type CONTEXT_ACTION = 'CONTEXT_ACTION'
export const CONTEXT_ACTION:CONTEXT_ACTION = 'CONTEXT_ACTION'

export type OtherAction = { type: '' };
export const OtherAction : OtherAction = { type: '' };

export type ContextAction<T extends Action = OtherAction> = {
  type: CONTEXT_ACTION
  guid: string
  action: T
}

export function contextAction(guid:string, action:OtherAction) : ContextAction{
  return {
    type : CONTEXT_ACTION,
    guid : guid,
    action : action
  }
}

export type ContextSpawnedAction = {
  type: CONTEXT_SPAWNED
  guid: string
}

/**
 * @param {string} guid
 * @returns {{type: string, guid: string|undefined}}
 */
export function contextSpawnedAction(guid:string) : ContextSpawnedAction {
  return {
    type: CONTEXT_SPAWNED,
    guid: guid
  }
}

export type ContextDespawnedAction = {
  type: CONTEXT_DESPAWNED
  guid: string
}

export function contextDespawnedAction(guid:string): ContextDespawnedAction{
  return {
    type: CONTEXT_DESPAWNED,
    guid: guid
  }
}

/*export type AllContextsReducerState = {
  [key: string] : ContextState;
}*/

export type AllContextsReducerActions = ContextAction | ContextSpawnedAction | ContextDespawnedAction | OtherAction

/*export default function allContextsReducer<T extends Action>(state:AllContextsReducerState = {}, action:AllContextsReducerActions){
  switch(action.type){
    case CONTEXT_SPAWNED: return {...state, [action.guid]: contextReducer(state[action.guid], action)}
    case CONTEXT_DESPAWNED: return {...state, [action.guid]: contextReducer(state[action.guid], action)}
    case CONTEXT_ACTION: return {...state, [action.guid]: contextReducer(state[action.guid], action.action)}
    default : return state
  }
}*/

