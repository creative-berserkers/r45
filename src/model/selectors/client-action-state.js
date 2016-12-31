import {currentActionState} from './client'

export function numberOfRerolls(state){
  return currentActionState(state).numberOfRolls || 0
}

export function rolledDices(state) {
  return currentActionState(state).rolledDices || []
}