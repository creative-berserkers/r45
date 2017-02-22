export const LIST_QUERY = 'listQuery'

export const LIST_QUERY_RESPONSE = 'LIST_QUERY:LIST_QUERY_RESPONSE'

/**
 * @param {number} option
 * @returns {{type: string, option: number}}
 */
export function listQueryResponseAction(option){
  return {
    type: LIST_QUERY_RESPONSE,
    option
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
 * @return string
 */
export function querySelector(state){
  return state.query
}

/**
 * @param {{options:Array}} state
 * returns Array
 */
export function optionsSelector(state){
  return state.options
}

/**
 * @typedef {{name: string, id: string, query: string, options: Array}} ListQuery
 */

/**
 * @param {string} id
 * @param {string} query
 * @param {Array} options
 * @returns ListQuery
 */
export function createListQuery({id, query, options}) {
  return {
    name: LIST_QUERY,
    id,
    query,
    options
  }
}

const initialState = createListQuery('none', 'none',[])

/**
 * @typedef {{name:string, id:string, query:string, options:Array}} ListQueryState
 */

/**
 * @param {ListQueryState} state
 * @param {*} action
 * @returns {* | ListQueryState}
 */
export default function introduction(state = initialState, action) {
  switch (action.type) {
    default :
      return state
  }
}