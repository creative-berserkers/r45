const ROLL = 'ROLL_DICES:ROLL'

export function roll(guid, rolledDices){
  return {
    type: ROLL,
    guid : guid,
    rolledDices : rolledDices
  }
}

const initialState = {
  name: 'rollDices',
  rolledDices: [],
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
    default :
      return state
  }
}