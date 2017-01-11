const ROLL = 'ROLL_DICES:ROLL'
const LOCK = 'ROLL_DICES:LOCK'


export function rollAction(guid, rolledDices) {
  return {
    type: ROLL,
    guid: guid,
    rolledDices: rolledDices
  }
}
export function lockAction(guid, locks) {
  return {
    type: LOCK,
    guid: guid,
    locks: locks
  }
}

export function numberOfRerollsSelector(state){
  return state.numberOfRolls
}

export function rolledDicesSelector(state) {
  return state.rolledDices
}

export function locksSelector(state){
  return state.locks
}


const initialState = {
  name: 'rollDices',
  rolledDices: [],
  locks:[],
  numberOfRolls: 0
}

export default function rollDices(state = initialState, action) {
  switch (action.type) {
    case ROLL:
      return {
        ...state,
        rolledDices: action.rolledDices,
        numberOfRolls: (state.numberOfRolls+1)
      }
    case LOCK:
      return {
        ...state,
        locks : action.locks
      }
    default :
      return state
  }
}