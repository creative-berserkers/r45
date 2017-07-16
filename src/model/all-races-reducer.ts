import {Action} from "redux";
export const initialState = {
  'race_human' : {
    maxHp : 10
  },
  'race_elf' : {
    maxHp : 10
  }
}

/**
 * @typedef {{maxHp:number}} Race
 * @typedef {Object.<string,Race>} AllRacesState
 */

/**
 * @param {AllRacesState} state
 * @param {*} action
 * @returns {AllRacesState}
 */
export default function (state = initialState, action:Action){
  switch(action.type){
    default : return state
  }
}