import * as React from 'react'
import { connect } from 'react-redux'

import { Dispatch } from 'redux'
import { RootState } from '../model/index'
import BattleView from "./BattleView";


export interface GameDispatchProps {

}
export default class Game extends React.Component<any, any> {
  constructor () {
    super()
  }

  render () {
    return <div>
      <BattleView />
    </div>
  }
}

const mapDispatchToProps = function (dispatch: Dispatch<any>): GameDispatchProps {
  return {}
}

const mapStateToProps = function (state: RootState) {
  return {
    battleState: state.stack[0]
  }
}

const GameContainer = connect<{}, GameDispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Game)

// export GameContainer
