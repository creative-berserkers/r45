import {Action} from "redux";
export const initialState = {
  'class_mage' : {
    actions : ['action_shield','action_maneuver', 'action_throw', 'action_fireball']
  },
  'class_druid' : {
    actions : ['action_shield','action_maneuver', 'action_throw', 'action_fireball']
  }
}

/**
 * @typedef {{actions:Array.<string>}} Class
 * @typedef {Object.<string,Class>} AllClassesState
 */

/**
 * @param {AllClassesState} state
 * @param {*} action
 * @returns {AllClassesState}
 */
export default function (state = initialState, action:Action){
  switch(action.type){
    default : return state
  }
}