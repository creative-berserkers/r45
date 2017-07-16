import {filterFirst} from '../../utils'

const CLIENT_STATE_ENTER_PUSH = 'CLIENT_STATE_ENTER_PUSH'
const ASSIGN_DICE = 'ASSIGN_DICES:ASSIGN_DICE'
const RESET = 'ASSIGN_DICES:RESET'

export function rolledDicesSelector(state){
  return state.rolledDices
}

export function currentDicesSelector(state){
  return state.currentDices
}

export function assignedActionsSelector(state){
  return state.actions
}

function slotsReducer(state = [], action) {
  switch (action.type) {
    case ASSIGN_DICE : {
      const newArray = state.slice(0)
      newArray[action.slotIndex] = action.dice
      return newArray
    }
    default :
      return state
  }
}

function actionsReducer(state = [], action) {
  switch (action.type) {
    case ASSIGN_DICE : {
      const newArray = state.slice(0)
      newArray[action.actionIndex] = slotsReducer(state[action.actionIndex], action)
      return newArray
    }
    default :
      return state
  }
}


export function assignDiceAction(guid, actionIndex, slotIndex, dice) {
  return {
    type: ASSIGN_DICE,
    guid: guid,
    actionIndex: actionIndex,
    slotIndex: slotIndex,
    dice: dice
  }
}

export function resetAction(guid) {
  return {
    type: RESET,
    guid: guid
  }
}


const initialState = {
  name: 'assignDices',
  rolledDices: [],
  currentDices: [],
  actions: []
}
export default function assignDices(state = initialState, action) {
  switch (action.type) {
    case CLIENT_STATE_ENTER_PUSH :
      return {
        ...state,
        rolledDices: action.initialState.rolledDices,
        currentDices : action.initialState.rolledDices
      }
    case ASSIGN_DICE :
      return {
        ...state,
        actions: actionsReducer(state.actions, action),
        currentDices : filterFirst(state.currentDices, action.dice)
      }
    case RESET : return {
      ...state,
      currentDices : state.rolledDices,
      actions: []
    }

    default :
      return state
  }
}