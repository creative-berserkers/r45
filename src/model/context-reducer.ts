//import * as allClientStateReducers from './states'
import {Action} from "redux";

export const PLAYER_NAME_SET = 'PLAYER_NAME_SET'
export const CLASS_ID_SET = 'CLASS_ID_SET'
export const RACE_ID_SET = 'RACE_ID_SET'
export const STACK_PUSH = 'STACK_PUSH'
export const STACK_POP = 'STACK_POP'
export const STACK_ACTION = 'STACK_ACTION'

/**
 * @typedef {{type: string, playerName: string}} PlayerNameAction
 */

/**
 * @param {string} playerName
 * @returns PlayerNameAction
 */
export function setPlayerNameAction(playerName:string) {
  return {
    type: PLAYER_NAME_SET,
    playerName: playerName
  }
}

/**
 * @typedef {{type: string, classId: string}} PlayerClassIdAction
 */

/**
 * @param {string} classId
 * @returns PlayerClassIdAction
 */
export function setPlayerClassIdAction(classId:string) {
  return {
    type: CLASS_ID_SET,
    classId: classId
  }
}

/**
 * @typedef {{type: string, raceId: string}} PlayerRaceIdAction
 */

/**
 * @param {string} raceId
 * @returns PlayerRaceIdAction
 */
export function setPlayerRaceIdAction(raceId:string) {
  return {
    type: RACE_ID_SET,
    raceId: raceId
  }
}

/**
 * @param action wrapped action
 * @returns {{type: string, action: Object}}
 */
export function stackAction(action:Action){
  return {
    type : STACK_ACTION,
    action : action
  }
}

/**
 * @typedef {{type: string, name: string, initialState: *}} PushClientStateAction
 */

/**
 * @param {string} name
 * @param {*} initialState
 * @returns {{type: string, name: string, initialState: *}}
 */
export function pushClientStateAction(name:string, initialState:any){
  return {
    type: STACK_PUSH ,
    name: name,
    initialState : initialState
  }
}

export function popClientStateAction(returnState:any) {
  return {
    type: STACK_POP,
    returnState : returnState
  }
}

/**
 * @param {{classId:string}} state
 * @returns {string}
 */
export function getClassId(state:ContextState) {
  return state.classId
}

/**
 * @param {{stack:Array}} state
 * @returns {Array}
 */
export function getStack(state:ContextState) {
  return state ? state.stack : []
}

/**
 * @param {{playerName:string}} state
 * @returns {string}
 */
export function getPlayerName(state:ContextState) {
  return state.playerName
}

/**
 * @param {{stack:Array}} state
 * @returns {Object||undefined}
 */
export function getLastStackState(state:ContextState){
  return state.stack[state.stack.length - 1]
}

/**
 * @param {{stack:Array.<{name}>}} state
 */
export function getLastStackStateName(state:ContextState){
  const lastStackState = getLastStackState(state)
  return lastStackState ? lastStackState.name : undefined
}

/**
 * @param {{stack:Array.<{name}>}} state
 * @param {string} name
 * @returns {Object}
 */
export function getStackStateWithName(state:ContextState, name:string){
  return state.stack.find(s => s.name === name)
}

const initialState = {
  playerName: 'Noname',
  classId: 'mage',
  raceId: 'none',
  actions: [],
  stack : []
}

export interface ContextState {
  playerName: string
  classId: string
  raceId: string
  actions: any[]
  stack: any[]
}

/**
 * @typedef {{playerName: string, classId: string, raceId: string, actions: Array, stack: Array}} Context
 */

/**
 * @param {Context} state
 * @param {PlayerNameAction|PlayerClassIdAction|PlayerRaceIdAction|PushClientStateAction} action
 * @param clientStateReducers
 * @returns {Context}
 */
/*export default function contextReducer(state:ContextState = initialState, action:Action, clientStateReducers = allClientStateReducers){
  switch (action.type){
    case PLAYER_NAME_SET :
      return {
        ...state,
        playerName: (action as any).playerName
      }
    case CLASS_ID_SET :
      return {
        ...state,
        classId: (action as any).classId
      }
    case RACE_ID_SET :
      return {
        ...state,
        raceId: (action as any).raceId
      }
    case STACK_PUSH :
      return {
        ...state,
        stack : [...state.stack, (clientStateReducers as any)[(action as any).name]((action as any).initialState, {type: '@INIT@'})]
      }
    case STACK_POP :
      return {
        ...state,
        stack: state.stack.slice(0, state.stack.length - 1)
      }
    case STACK_ACTION : {
        const topAction = state.stack[state.stack.length-1]
        if(topAction){
          return {
              ...state,
              stack: state.stack.slice(0, state.stack.length - 1).concat((clientStateReducers as any)[topAction.name](topAction, (action as any).action))
          }
        }
        return state
    }
    default : return state
  }
}*/