import {combineReducers} from 'redux'

import allContextsReducer from './all-contexts-reducer'
import allActionsReducer from './all-actions-reducer'
import allClassesReducer from './all-classes-reducer'
import allRacesReducer from './all-races-reducer'
import messagesReducer from './messages-reducer'

/**
 * @param {{classes:Array}} state
 * @returns {Array}
 */
export function allClassesSelector(state) {
  return state.classes
}

/**
 * @param {{races:Array}} state
 * @returns {Array}
 */
export function allRacesSelector(state) {
  return state.races
}

export default combineReducers({
  messages: messagesReducer,
  actions : allActionsReducer,
  classes : allClassesReducer,
  races : allRacesReducer,
  contexts : allContextsReducer
})
