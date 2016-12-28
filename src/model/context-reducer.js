import {guid} from '../utils'

const initialState = {
  actionState:[],
  messages : [{
    id : guid(),
    from : 'Chat System',
    to : 'all',
    message : 'Welcome to chat'
  }]
}

export default function contextReducer(state = initialState, action){
  switch(action.type){
    case 'CLIENT_STATE_ENTER_PUSH': return {
      ...state,
      actionState: state.actionState.concat(action.name)
    }
    case 'CLIENT_STATE_ENTER_REPLACE' : return {
      ...state,
      actionState: state.actionState.slice(0,state.actionState.length-1).concat(action.name)
    }
    case 'SAY' : return {
      ...state,
      messages : state.messages.concat({
        id : action.id,
        from: action.from,
        to: action.to,
        message: action.message
      })
    }
    case 'LOAD_CLIENT_STATE' : return action.state
    default: return state
  }
}
