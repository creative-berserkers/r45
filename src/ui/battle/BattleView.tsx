import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import Dice from '../common/Dice'
import Drawer, { DrawerAction } from '../common/Drawer'
import { Card } from '../common/Card'
import { UnitComponent } from '../common/UnitComponent'
import { BattleState, BattleViewState, PlayerCard, PlayerQuerySelectTarget } from './battle-reducer'
import {
  keepDicesRequest,
  cardPlayRequest, playerIdAssigned, setActiveUnitId, rollDicesRequest,
  unitSelectRequest, groupSelectRequest, diceSelectRequest,
} from './battle-actions'
import {
  EnhancedGroup,
  ActiveUnitDice,
  BattleSelectorProps,
  enhancedGroupsSelector, EnhancedUnit,
} from './battle-selectors'
import { checkCondition } from './battle-utils'

const diceStyle = {
  margin: '2px',
}

const cardStyle = {
  margin: '10px',
}

const unitStyle = {
  margin: '10px',
}

export interface BattleViewStateProps {
  activeUnitId: string
  groupsWithUnits: EnhancedGroup[]
}

export interface BattleViewDispatchProps {
  onActiveUnitSelected: (unitId: string) => void
  onPlayerIdAssigned: (playerId: string) => void
  onDiceSelected: (unitId: string, diceId: string) => void
  onRollDicesSelected: (unitId: string) => void
  onKeepDicesSelected: (unitId: string) => void
  onCardSelected: (unitId: string, cardId: PlayerCard) => void
  onUnitSelected: (unitId: string, targetUnitId: string) => void,
  onGroupSelected: (unitId: string, targetGroupId: string) => void
}

export interface BattleViewContainerProps {
  onConnect: () => void
  battleStateSelector: (state: any) => BattleState
  battleViewStateSelector: (state: any) => BattleViewState
}

export type BattleViewProps = BattleViewStateProps & BattleViewDispatchProps & BattleViewContainerProps


class BattleView extends React.Component<BattleViewProps, any> {

  constructor(props: BattleViewProps, context?: any) {
    super(props, context)
  }

  componentDidMount() {
    this.props.onPlayerIdAssigned('player1')
  }

  onDiceClick = (selectedDice: ActiveUnitDice) => () => {
    this.props.onDiceSelected(this.props.activeUnitId, selectedDice.id)
  }

  onDiceAction = (action: DrawerAction) => {
    if (action.id === 'roll') {
      this.props.onRollDicesSelected(this.props.activeUnitId)
    }
    if (action.id === 'keep') {
      this.props.onKeepDicesSelected(this.props.activeUnitId)
    }
  }

  // noinspection JSUnusedLocalSymbols
  onCardSlotClick = (cardId: PlayerCard, face: number) => {

  }

  onCardAction = (action: DrawerAction) => {

  }

  onGroupAction = (groupId: string) => (action: DrawerAction) => {
    if (action.id === 'select') {
      this.props.onGroupSelected(this.props.activeUnitId, groupId)
    }
  }

  onCardClick = (cardId: PlayerCard) => {
    this.props.onCardSelected(this.props.activeUnitId, cardId)
  }

  onActiveUnitSelected = (unitId: string) => {
    console.log('active unit selected')
    this.props.onActiveUnitSelected(unitId)
  }

  onUnitSelected = (unitId: string) => {
    console.log('unit selected')
    this.props.onUnitSelected(this.props.activeUnitId, unitId)
  }

  getActiveUnit(props: BattleViewStateProps): (EnhancedUnit | undefined) {
    return props.groupsWithUnits.reduce((unit: EnhancedUnit | undefined, group: EnhancedGroup) => {
      return unit || group.units.find(u => u.id === props.activeUnitId)
    }, undefined)
  }

  render() {
    const activeUnit = this.getActiveUnit(this.props)

    return <div>
      <div>
        <button onClick={this.props.onConnect}>Connect</button>
      </div>
      {this.props.groupsWithUnits.map(group => <Drawer
        key={group.id}
        actions={[
          {
            id: 'select',
            name: 'Select',
            disabled: false,
            visible: activeUnit && checkCondition(PlayerQuerySelectTarget.GROUP, group, activeUnit.query),
          },
        ]}
        onAction={this.onGroupAction(group.id)}
        style={{ backgroundColor: '#BDC3CF' }}
      >
        {group.units
          .map(unit => <UnitComponent
            key={unit.id}
            unit={unit}
            debug={true}
            showSelectButton={activeUnit && checkCondition(PlayerQuerySelectTarget.UNIT, unit, activeUnit.query)}
            onSelectButton={this.onUnitSelected}
            onSelect={this.onActiveUnitSelected}
            style={unitStyle}
          />)}
      </Drawer>)}
      {activeUnit && (
        <Drawer
          key={'dice-drawer'}
          actions={[
            {
              id: 'roll',
              name: `Roll(${activeUnit.rolls})`,
              visible: checkCondition(PlayerQuerySelectTarget.DICE_ACTION, 'roll', activeUnit.query),
            },
            {
              id: 'keep',
              name: 'Keep',
              visible: checkCondition(PlayerQuerySelectTarget.DICE_ACTION, 'keep', activeUnit.query),
            }].map(action => ({ ...action, visible: checkCondition(PlayerQuerySelectTarget.DICE_ACTION, action, activeUnit.query) }))
          }
          onAction={this.onDiceAction}
          style={{ backgroundColor: '#85929E' }}
        >
          {activeUnit.diceRolls.map(dice => (
            <Dice
              key={dice.id}
              face={dice.rollResult}
              style={diceStyle}
              showHighlight={checkCondition(PlayerQuerySelectTarget.DICE, dice, activeUnit.query)}
              selected={false}
              onClick={this.onDiceClick(dice as any)}
              description={JSON.stringify(dice, null, 2)}
            />
          ))}
        </Drawer>
      )}
      {activeUnit && <Drawer
        key={'card-drawer'}
        actions={[
          {
            id: 'accept-assignment',
            name: 'Accept',
            disabled: activeUnit.rolls === 0,
          },
        ]}
        onAction={this.onCardAction}
        style={{ backgroundColor: '#85929E' }}
      >
        {activeUnit && activeUnit.cards.map(card => <Card
          key={card.id}
          id={card.id}
          name={card.id}
          style={cardStyle}
          diceSlot={card.require}
          diceSlotEmpty={true}
          showSlot={true}
          showPlayButton={checkCondition(PlayerQuerySelectTarget.CARD, card, activeUnit.query)}
          onDiceSlotClick={this.onCardSlotClick}
          onClick={this.onCardClick}
          description={JSON.stringify(card, null, 2)}/>)}
      </Drawer>}
      {/*<Drawer
        key={'turn-unit-card-drawer'}
        actions={[]}
        onAction={this.onCardAction}
        style={{ backgroundColor: '#85929E' }}
      >
        {this.props.activeTurnCards.map(card => <TurnMarker style={{ border: '1px solid black' }} activeUnitCard={card} onSelect={() => {
        }} onSelectButton={() => {
        }}/>)}
      </Drawer>*/}
    </div>
  }
}

const mapDispatchToProps = function (dispatch: Dispatch<any>): BattleViewDispatchProps {
  return bindActionCreators({
    onActiveUnitSelected: setActiveUnitId,
    onPlayerIdAssigned: playerIdAssigned,
    onDiceSelected: diceSelectRequest,
    onRollDicesSelected: rollDicesRequest,
    onKeepDicesSelected: keepDicesRequest,
    onCardSelected: cardPlayRequest,
    onUnitSelected: unitSelectRequest,
    onGroupSelected: groupSelectRequest,
  }, dispatch)
}

const mapStateToProps = function (state: any, ownProps: BattleViewContainerProps): BattleViewStateProps {
  const battleState: BattleState = ownProps.battleStateSelector(state)
  const battleViewState: BattleViewState = ownProps.battleViewStateSelector(state)
  const unitId = battleViewState.activeUnitId
  return {
    activeUnitId: unitId,
    groupsWithUnits: enhancedGroupsSelector(battleState),
    // turns: turnsSelector(battleState, {activeUnitId}),
  }
}

// noinspection JSUnusedGlobalSymbols
export default connect<BattleViewStateProps, BattleViewDispatchProps, BattleViewContainerProps>(mapStateToProps, mapDispatchToProps)(BattleView)

