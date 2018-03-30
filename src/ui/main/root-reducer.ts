import { battleReducer, BattleState, battleViewReducer, BattleViewState } from '../battle/battle-reducer'
import { combineReducers, Reducer } from 'redux'

export interface RootState {
  battle: BattleState,
  battleView: BattleViewState
}

export function getBattleState(state: RootState): BattleState {
  return state.battle
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  battle: battleReducer,
  battleView: battleViewReducer,
} as any)

export default rootReducer
