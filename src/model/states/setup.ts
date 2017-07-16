export const SETUP = 'setup'


const initialState = {
  name: SETUP
}

export function createSetup() {
  return {
    name: SETUP
  }
}

/**
 * @typedef {{
 *          name:string}} SetupState
 */

/**
 * @param {undefined | SetupState} state
 * @param { Action | PlayerNameAction | PlayerClassIdAction | PlayerRaceIdAction } action
 * @returns {* | SetupState}
 */
/*export default function introduction(state = initialState, action) {
  switch (action.type) {
    default :
      return state
  }
}*/