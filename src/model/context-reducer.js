import {guid as guidGenerator} from '../utils'
import {changed} from '../utils'
import actionStateReducer from './action-state-reducer'

export function message(from, to, message){
  return {
    type: 'MESSAGE',
    id: guidGenerator(),
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

export function pushState(guid, name){
  return {
    type: 'CLIENT_STATE_ENTER_PUSH',
    guid: guid,
    name: name
  }
}

export function popState(guid) {
  return {
    type: 'CLIENT_STATE_POP',
    guid: guid
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
  actions:[
    {
      name :'fireball',
      slots: [{
        require: 5,
        dices:[]
      }]
    },
    {
      name :'throw',
      slots: [{
        require: 6,
        dices:[]
      }]
    }
  ],
  messages : [{
    id : guidGenerator(),
    from : 'Chat System',
    to : 'all',
    message : 'Welcome to chat'
  }]
}

export default function contextReducer(state = initialState, action){
  switch(action.type){
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
    default: return changed(state, {
      ...state,
      actionState : actionStateReducer(state.actionState, action)
    })
  }
}
