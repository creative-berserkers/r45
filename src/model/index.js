import allContextsReducer from './all-contexts-reducer'
import allActionsReducer from './all-actions-reducer'
import allClassesReducer from './all-classes-reducer'
import allRacesReducer from './all-races-reducer'
import messagesReducer from './messages-reducer'

const LOAD_STATE = 'LOAD_STATE'

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

export function loadStateAction(state) {
  return {
    type : LOAD_STATE,
    state : state
  }
}

export default function rootReducer(state = {}, action) {
  switch (action) {
    case LOAD_STATE :
      return action.state
    default :
      return {
        messages: messagesReducer(state.messages, action),
        actions: allActionsReducer(state.actions, action),
        classes: allClassesReducer(state.classes, action),
        races: allRacesReducer(state.races, action),
        contexts: allContextsReducer(state.contexts, action)
      }
  }
}
