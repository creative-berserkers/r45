import {AllStateId, gameReducer, GameStates} from './game-reducer'
import {Action} from "redux";
import {Stack} from './stack-reducer'

const LOAD_STATE = 'LOAD_STATE'


export interface RootState {
  stack: Stack<GameStates, AllStateId>
}

export const INITIAL_STATE:RootState = {stack: []}

const rootReducer = (state:RootState = INITIAL_STATE, action:Action):RootState => {
  switch (action.type) {
    default :
      return {
        stack: gameReducer(state.stack, action)
      }
  }
}

export default rootReducer