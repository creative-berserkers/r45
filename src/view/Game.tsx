import * as React from 'react'
import { connect } from 'react-redux'

import { Dispatch } from 'redux'
import AppBar from 'material-ui/AppBar'
import { Avatar } from './components/Avatar'
import { Card } from './components/Card'
import {
  deepOrange300,
  purple500
} from 'material-ui/styles/colors'
// import { AllStateId, BattleState, GameStates, UnitState } from '../model/game-reducer'
import { RootState } from '../model/index'
import { Drawer } from './components/Drawer'
import { Action } from './components/Action'
import { path, Stack, State } from 'stack-fsm-reducer'

const stackViewMapping: any = {
  'setup:inputQuery': ([setupState, {query}]: [any, any], dispatch: Dispatch<any>) => {
    let inputVal = ''
    return
  }
}

/*export interface GameStateProps {
  battleState?: BattleState
}*/

export interface GameDispatchProps {

}

// export type GameProps = GameStateProps & GameDispatchProps

export interface GameInternalState {
  selectedUnitId: string | undefined
  selectedActionId: string | undefined
}

const diceDrawerStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '205px',
  left: '10px',
  right: '10px',
  height: '60px'
}

export default class Game extends React.Component<any, any> {
  constructor () {
    super()
  }

  render () {
    // const {groups, units, actions} = this.props.battleState
    // const {selectedUnitId} = this.state

    return <div>
      {<AppBar
          title='Title'
          iconClassNameRight='muidocs-icon-navigation-expand-more'
      />}
      {/*Object.keys(groups).map((groupId) => {
        // const unitsInGroupIds = Object.keys(units).filter(unitId => (units[unitId][0] as UnitState).groupId === groupId)
        return <Card>
          {unitsInGroupIds.map((unitId) => <Avatar
              unitId={unitId}
              onClick={(unitId) => this.setState({...this.state, selectedUnitId: unitId})}
              isSelected={selectedUnitId === unitId}
              classId={(units[unitId][0] as UnitState).classId}
              name={(units[unitId][0] as UnitState).name}
              size={60}
          >
            {(units[unitId][0] as UnitState).name}
          </Avatar>)}
        </Card>
      })*/}

      {/*selectedUnitId === undefined ? null : renderDice(path(units[selectedUnitId]), {stateId: ''})*/}

      {/*selectedUnitId === undefined ? null : <Drawer style={{
        position: 'fixed',
        bottom: '0px',
        left: '10px',
        right: '10px',
        height: '200px'
      }}>
        {(units[selectedUnitId][0] as UnitState).actions.map((actionId) => <Action
            actionId={actionId}
            name={actions[actionId].name}
            description={actions[actionId].description}
            onClick={(actionId) => {
              this.setState({...this.state, selectedActionId: actionId})
            }}
        />)}
      </Drawer>*/}
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
