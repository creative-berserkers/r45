import * as React from 'react'
import {connect} from 'react-redux'

import {Dispatch} from 'redux'
import AppBar from 'material-ui/AppBar';
import {Avatar} from './components/Avatar'
import {Card} from './components/Card';
import {
  deepOrange300,
  purple500,
} from 'material-ui/styles/colors';
import {AllStateId, BattleState, GameStates} from '../model/game-reducer'
import {RootState} from '../model/index'
import {Drawer} from './components/Drawer'
import {Action} from './components/Action'

const stackViewMapping:any = {
  'setup:inputQuery': ([setupState, {query}]:[any,any], dispatch:Dispatch<any>) => {
    let inputVal = ''
    return
  }
}

export interface GameStateProps {
  battleState: BattleState
}

export interface GameDispatchProps {

}

export type GameProps = GameStateProps & GameDispatchProps

export interface GameInternalState {
  selectedUnitId : string | undefined
  selectedActionId: string | undefined
}

export class Game extends React.Component<GameProps,GameInternalState> {
  constructor(){
    super()
    this.state = {selectedUnitId: undefined, selectedActionId: undefined}
  }

  render() {
    const {groups, units, actions} = this.props.battleState
    const {selectedUnitId} = this.state

    return <div>
      <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      {Object.keys(groups).map((groupId) => {
        const unitsInGroupIds = Object.keys(units).filter(unitId => units[unitId].groupId === groupId)
        return <Card>
        {unitsInGroupIds.map((unitId) => <Avatar
            unitId={unitId}
            onClick={(unitId) => this.setState({...this.state,selectedUnitId: unitId})}
            isSelected={selectedUnitId === unitId}
            classId={units[unitId].classId}
            name={units[unitId].name}
            size={60}
        >
          {units[unitId].name}
        </Avatar>)}
      </Card>})}

      {selectedUnitId === undefined ? <Drawer/> : <Drawer>
        {units[selectedUnitId].actions.map((actionId)=><Action
            actionId={actionId}
            name={actions[actionId].name}
            description={actions[actionId].description}
            onClick={(actionId)=>{this.setState({...this.state, selectedActionId: actionId})}}
        />)}
      </Drawer>}
    </div>
  }
}

const mapDispatchToProps = function (dispatch:Dispatch<any>):GameDispatchProps {
  return {}
}

const mapStateToProps = function (state:RootState):GameStateProps {
  return {
    battleState : state.stack[0]
  }
}

const GameContainer = connect<GameStateProps, GameDispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Game)

export default GameContainer