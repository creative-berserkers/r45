export const MESSAGE = 'MESSAGE'

/**
 * @typedef {{type: string, id:string, from: string, message: string}} MessageAction
 */

/**
 * @param {string} id
 * @param {string} from
 * @param {string} message
 * @returns {MessageAction}
 */
/*export function messageAction(id, from, message) {
  return {
    type: MESSAGE,
    id,
    from,
    message
  }
}*/

//const initialState = []

/**
 * @typedef {{id:string, from: string, message: string}} Message
 * @typedef {Array.<Message>} MessagesState
 */

/**
 * @param {undefined | MessagesState} state
 * @param {MessageAction} action
 * @returns {* | MessagesState}
 */
/*export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case MESSAGE :
      return state.concat({
        id: action.id,
        from: action.from,
        message: action.message
      })
    default :
      return state
  }
}*/