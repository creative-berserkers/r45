"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLAYER_NAME_SET = 'PLAYER_NAME_SET';
exports.CLASS_ID_SET = 'CLASS_ID_SET';
exports.RACE_ID_SET = 'RACE_ID_SET';
exports.STACK_PUSH = 'STACK_PUSH';
exports.STACK_POP = 'STACK_POP';
exports.STACK_ACTION = 'STACK_ACTION';
/**
 * @typedef {{type: string, playerName: string}} PlayerNameAction
 */
/**
 * @param {string} playerName
 * @returns PlayerNameAction
 */
function setPlayerNameAction(playerName) {
    return {
        type: exports.PLAYER_NAME_SET,
        playerName: playerName
    };
}
exports.setPlayerNameAction = setPlayerNameAction;
/**
 * @typedef {{type: string, classId: string}} PlayerClassIdAction
 */
/**
 * @param {string} classId
 * @returns PlayerClassIdAction
 */
function setPlayerClassIdAction(classId) {
    return {
        type: exports.CLASS_ID_SET,
        classId: classId
    };
}
exports.setPlayerClassIdAction = setPlayerClassIdAction;
/**
 * @typedef {{type: string, raceId: string}} PlayerRaceIdAction
 */
/**
 * @param {string} raceId
 * @returns PlayerRaceIdAction
 */
function setPlayerRaceIdAction(raceId) {
    return {
        type: exports.RACE_ID_SET,
        raceId: raceId
    };
}
exports.setPlayerRaceIdAction = setPlayerRaceIdAction;
/**
 * @param action wrapped action
 * @returns {{type: string, action: Object}}
 */
function stackAction(action) {
    return {
        type: exports.STACK_ACTION,
        action: action
    };
}
exports.stackAction = stackAction;
/**
 * @typedef {{type: string, name: string, initialState: *}} PushClientStateAction
 */
/**
 * @param {string} name
 * @param {*} initialState
 * @returns {{type: string, name: string, initialState: *}}
 */
function pushClientStateAction(name, initialState) {
    return {
        type: exports.STACK_PUSH,
        name: name,
        initialState: initialState
    };
}
exports.pushClientStateAction = pushClientStateAction;
function popClientStateAction(returnState) {
    return {
        type: exports.STACK_POP,
        returnState: returnState
    };
}
exports.popClientStateAction = popClientStateAction;
/**
 * @param {{classId:string}} state
 * @returns {string}
 */
function getClassId(state) {
    return state.classId;
}
exports.getClassId = getClassId;
/**
 * @param {{stack:Array}} state
 * @returns {Array}
 */
function getStack(state) {
    return state ? state.stack : [];
}
exports.getStack = getStack;
/**
 * @param {{playerName:string}} state
 * @returns {string}
 */
function getPlayerName(state) {
    return state.playerName;
}
exports.getPlayerName = getPlayerName;
/**
 * @param {{stack:Array}} state
 * @returns {Object||undefined}
 */
function getLastStackState(state) {
    return state.stack[state.stack.length - 1];
}
exports.getLastStackState = getLastStackState;
/**
 * @param {{stack:Array.<{name}>}} state
 */
function getLastStackStateName(state) {
    var lastStackState = getLastStackState(state);
    return lastStackState ? lastStackState.name : undefined;
}
exports.getLastStackStateName = getLastStackStateName;
/**
 * @param {{stack:Array.<{name}>}} state
 * @param {string} name
 * @returns {Object}
 */
function getStackStateWithName(state, name) {
    return state.stack.find(function (s) { return s.name === name; });
}
exports.getStackStateWithName = getStackStateWithName;
var initialState = {
    playerName: 'Noname',
    classId: 'mage',
    raceId: 'none',
    actions: [],
    stack: []
};
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
