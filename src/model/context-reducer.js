import {guid} from '../utils'

export function message(from, to, message){
  return {
    type: 'MESSAGE',
    id: guid(),
    from: from,
    guid: (to !== 'all'? to : undefined),
    to: to,
    message: message
  }
}

export function setState(guid, name){
  return {
    type : 'CLIENT_STATE_ENTER_REPLACE',
    guid : guid,
    name : name
  }
}

export function setName(guid, name){
  return {
    type : 'CLIENT_SET_NAME',
    guid : guid,
    name : name
  }
}

export function setClass(guid, className){
  return {
    type : 'CLIENT_SET_CLASS',
    guid : guid,
    name : className
  }
}

const initialState = {
  name : 'Noname',
  className: 'Noone',
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
    case 'MESSAGE' : return {
      ...state,
      messages : state.messages.concat({
        id : action.id,
        from: action.from,
        to: action.to,
        message: action.message
      })
    }
    case 'CLIENT_SET_NAME' : return {
      ...state,
      name : action.name
    }
    case 'CLIENT_SET_CLASS' : return {
      ...state,
      className : action.name
    }
    case 'LOAD_CLIENT_STATE' : return action.state
    default: return state
  }
}
