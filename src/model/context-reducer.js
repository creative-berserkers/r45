import * as clientStateReducers from './states'

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
export function setPlayerNameAction(playerName) {
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
export function setPlayerClassIdAction(classId) {
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
export function setPlayerRaceIdAction(raceId) {
  return {
    type: RACE_ID_SET,
    raceId: raceId
  }
}

/**
 * @param action wrapped action
 * @returns {{type: string, action: Object}}
 */
export function stackAction(action){
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
export function pushClientStateAction(name, initialState){
  return {
    type: STACK_PUSH ,
    name: name,
    initialState : initialState
  }
}

export function popClientStateAction(returnState) {
  return {
    type: STACK_POP,
    returnState : returnState
  }
}

/**
 * @param {{classId:string}} state
 * @returns {string}
 */
export function getClassId(state) {
  return state.classId
}

/**
 * @param {{stack:Array}} state
 * @returns {Array}
 */
export function getStack(state) {
  return state.stack
}

/**
 * @param {{playerName:string}} state
 * @returns {string}
 */
export function getPlayerName(state) {
  return state.playerName
}

/**
 * @param {{stack:Array}} state
 * @returns {Object}
 */
export function getLastStackState(state){
  return state.stack[state.stack.length - 1]
}

/**
 * @param {{stack:Array.<{name}>}} state
 */
export function getLastStackStateName(state){
  return getLastStackState(state).name
}

/**
 * @param {{stack:Array.<{name}>}} state
 * @param {string} name
 * @returns {Object}
 */
export function getStackStateWithName(state, name){
  return state.stack.find(s => s.name === name)
}

const initialState = {
  playerName: 'Noname',
  classId: 'mage',
  raceId: 'none',
  actions: [],
  stack : []
}

export default function contextReducer(state = initialState, action){
  switch (action.type){
    case PLAYER_NAME_SET :
      return {
        ...state,
        playerName: action.playerName
      }
    case CLASS_ID_SET :
      return {
        ...state,
        classId: action.classId
      }
    case RACE_ID_SET :
      return {
        ...state,
        raceId: action.raceId
      }
    case STACK_PUSH :
      return {
        ...state,
        stack : [...state.stack, clientStateReducers[action.name](action.initialState, {type: '@INIT@'})]
      }
    case STACK_POP :
      return {
        ...state,
        stack: state.stack.slice(0, state.length - 1)
      }
    case STACK_ACTION : return state.stack.slice(0,state.stack.length-1).concat(clientStateReducers[action.name](state.stack[state.stack.length -1], action.action))
    default : return state
  }
}