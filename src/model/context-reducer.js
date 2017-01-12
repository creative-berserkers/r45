import {guid as guidGenerator} from '../utils'
import {changed} from '../utils'
import actionStateReducer from './action-state-reducer'


export function messageAction(from, to, message) {
  return {
    type: 'MESSAGE',
    id: guidGenerator(),
    from: from,
    guid: (to !== 'all' ? to : undefined),
    to: to,
    message: message
  }
}

export function setNameAction(guid, name) {
  return {
    type: 'CLIENT_SET_NAME',
    guid: guid,
    name: name
  }
}

export function setClassAction(guid, className) {
  return {
    type: 'CLIENT_SET_CLASS',
    guid: guid,
    name: className
  }
}

export function nameSelector(state){
  return state.name
}

export function classNameSelector(state){
  return state.className
}

export function idSelector(state){
  return `${nameSelector(state)}[${classNameSelector(state)}]`
}

export function actionsSelector(state){
  return state.actions
}

export function actionStateSelector(state){
  return state.actionState
}

export function actionStateCountSelector(state){
  return actionStateSelector(state).length
}

export function currentActionStateSelector(state){
  return state.actionState[state.actionState.length - 1]
}

export function lastActionStateSelector(state, name){
  return state.actionState.find(s => s.name === name)
}

export function currentActionStateNameSelector(state){
  return currentActionStateSelector(state).name
}


const initialState = {
  name: 'Noname',
  className: 'Noone',
  actionState: [],
  actions: [
    {
      name: 'Shield',
      slots: [{
        require: 1
      }]
    },
    {
      name: 'Maneuver',
      slots: [{
        require: 3
      }]
    },
    {
      name: 'Throw',
      slots: [{
        require: 6
      }]
    },
    {
      name: 'Fireball',
      slots: [
        {
          require: 5
        },
        {
          require: 6
        }
      ]
    }
  ],
  messages: [{
    id: guidGenerator(),
    from: 'Chat System',
    to: 'all',
    message: 'Welcome to chat'
  }]
}

export default function contextReducer(state = initialState, action) {
  switch (action.type) {
    case 'MESSAGE' :
      return {
        ...state,
        messages: state.messages.concat({
          id: action.id,
          from: action.from,
          to: action.to,
          message: action.message
        })
      }
    case 'CLIENT_SET_NAME' :
      return {
        ...state,
        name: action.name
      }
    case 'CLIENT_SET_CLASS' :
      return {
        ...state,
        className: action.name
      }
    case 'LOAD_CLIENT_STATE' :
      return action.state
    default:
      return changed(state, {
        ...state,
        actionState: actionStateReducer(state.actionState, action)
      })
  }
}
