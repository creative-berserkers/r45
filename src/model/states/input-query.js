export const INPUT_QUERY = 'inputQuery'

export const QUERY_RESPONSE = 'INPUT_QUERY:QUERY_RESPONSE'

/**
 * @typedef {{type: string, message: string}} ResponseAction
 */

/**
 * @param {string} message
 * @returns ResponseAction
 */
export function queryResponseAction(message){
  return {
    type: QUERY_RESPONSE,
    message
  }
}

/**
 * @param {{id:string}} state
 * @returns string
 */
export function idSelector(state){
  return state.id
}

/**
 * @param {{query:string}} state
 * @returns string
 */
export function querySelector(state){
  return state.query
}

/**
 * @typedef {{name: string, id: string, query: string}} InputQuery
 */

/**
 * @param {string} id
 * @param {string} query
 * @returns InputQuery
 */
export function createInputQuery({id = '', query = ''}) {
  return {
    name: INPUT_QUERY,
    id,
    query
  }
}

const initialState = createInputQuery({id:'', query:''})

/**
 * @typedef {{name:string, id:string, query:string}} InputQueryState
 */

/**
 * @param {InputQueryState} state
 * @param {*} action
 * @returns {* | InputQueryState}
 */
export default function introduction(state = initialState, action) {
  switch (action.type) {
    default :
      return state
  }
}