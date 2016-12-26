import {guid} from '../utils'

const initialState = {
  messages : [{
    id : guid(),
    from : 'Chat System',
    to : 'all',
    message : 'Welcome to chat'
  }]
}

export default function contextReducer(state = initialState, action){
  switch(action.type){
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
