import {battleReducer, BattleState, battleViewReducer, BattleViewState} from '../battle/battle-reducer'
import {combineReducers, Reducer} from 'redux'

export interface RootState {
    battle: BattleState,
    battleView: BattleViewState
}

const rootReducer:Reducer<RootState|undefined> = combineReducers({
    battle: battleReducer,
    battleView: battleViewReducer
})

export default rootReducer