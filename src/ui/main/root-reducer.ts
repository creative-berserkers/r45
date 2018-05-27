import { battleReducer, BattleState, battleViewReducer, BattleViewState } from '../battle/battle-reducer'
import { combineReducers, Reducer } from 'redux'
import { ViewState } from '../view/view-reducer'

export interface RootState {
  view: ViewState
  battle: BattleState,
  battleView: BattleViewState
}

export function getBattleState(state: RootState): BattleState {
  return state.battle
}

export function getViewState(state: RootState): ViewState {
  return state.view
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  view: battleViewReducer,
  battle: battleReducer,
  battleView: battleViewReducer,
} as any)

export default rootReducer
