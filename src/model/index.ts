/**
 * @param {{classes:Array}} state
 * @returns {Array}
 */
//import allContextsReducer from './all-contexts-reducer'
//import allActionsReducer from './all-actions-reducer'
//import allClassesReducer from './all-classes-reducer'
//import allRacesReducer from './all-races-reducer'
//import messagesReducer from './messages-reducer'
import {gameReducer} from './game-reducer'
import {Action} from "redux";

const LOAD_STATE = 'LOAD_STATE'

/*export function allClassesSelector(state) {
  return state.classes
}*/

/**
 * @param {{races:Array}} state
 * @returns {Array}
 */
/*export function allRacesSelector(state) {
  return state.races
}*/

/*export function loadStateAction(state) {
  return {
    type : LOAD_STATE,
    state : state
  }
}*/

/**
 * @param state
 * @param guid
 * @returns {Context}
 */
/*export function getContext(state, guid){
  return state.contexts[guid]
}*/

export default function rootReducer(state = {stack:[]}, action:Action) {
  switch (action.type) {
    /*case LOAD_STATE :
      return (action as any).state*/
    default :
      return {
        stack: gameReducer(state.stack, action)
        //messages: messagesReducer(state.messages, action),
        //actions: allActionsReducer(state.actions, action),
        //classes: allClassesReducer(state.classes, action),
        //races: allRacesReducer(state.races, action),
        //contexts: allContextsReducer(state.contexts, action)
      }
  }
}
