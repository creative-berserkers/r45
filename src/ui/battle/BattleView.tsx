import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Dice from '../common/Dice'
import Drawer, { DrawerAction } from '../common/Drawer'
import { Card } from '../common/Card'
import { UnitComponent } from '../common/UnitComponent'
import { BattleState, BattleViewState, PlayerCard, PlayerQuery, PlayerQuerySelectTarget } from './battle-reducer'
import {
  acceptAssignment,
  keepDicesRequest,
  cardPlayRequest, playerIdAssigned, setActiveUnitId, rollDicesRequest,
  unitSelectRequest, groupSelectRequest, request, diceSelectRequest,
} from './battle-actions'
import {
  cardDrawerActionsSelector, diceDrawerActionsSelector, groupsWithUnitsSelector, ActiveUnitCard, ActiveUnitDice,
  Group, BattleSelectorProps, unitQuerySelector, activeUnitCardsSelector,
  activeUnitDicesSelector,
  activeTurnCardsSelector,
} from './battle-selectors'
import { checkCondition } from './battle-utils'
import { TurnMarker } from '../common/TurnMarker'

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
  activeUnitQuery: PlayerQuery[]
  diceDrawerActions: DrawerAction[]
  cardDrawerActions: DrawerAction[]
  groupsWithUnits: Group[]
  unitDices: ActiveUnitDice[]
  unitCards: ActiveUnitCard[]
  activeTurnCards: ActiveUnitCard[]
}

export interface BattleViewDispatchProps {
  onActiveUnitSelected: (unitId: string) => void
  onPlayerIdAssigned: (playerId: string) => void
  onDiceSelectRequest: (unitId: string, diceId: string) => void
  onRollDicesRequest: (unitId: string) => void
  onKeepDices: (unitId: string) => void
  onAcceptAssignment: () => void
  onCardSelected: (unitId: string, cardId: PlayerCard) => void
  onUnitSelected: (unitId: string, targetUnitId: string) => void,
  onGroupSelected: (unitId: string, targetGroupId: string) => void
}

export interface BattleViewContainerProps {
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
    this.props.onDiceSelectRequest(this.props.activeUnitId, selectedDice.id)
  }

  onDiceAction = (action: DrawerAction) => {
    if (action.id === 'roll') {
      this.props.onRollDicesRequest(this.props.activeUnitId)
    }
    if (action.id === 'keep') {
      this.props.onKeepDices(this.props.activeUnitId)
    }
  }

  // noinspection JSUnusedLocalSymbols
  onCardSlotClick = (cardId: PlayerCard, face: number) => {

  }

  onCardAction = (action: DrawerAction) => {
    if (action.id === 'accept-assignment') {
      this.props.onAcceptAssignment()
    }
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

  render() {
    return <div>
      {this.props.groupsWithUnits.map(group => <Drawer
        key={group.id}
        actions={[
          {
            id: 'select',
            name: 'Select',
            disabled: false,
            visible: checkCondition(PlayerQuerySelectTarget.GROUP, group, this.props.activeUnitQuery),
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
            showSelectButton={checkCondition(PlayerQuerySelectTarget.UNIT, unit, this.props.activeUnitQuery)}
            onSelectButton={this.onUnitSelected}
            onSelect={this.onActiveUnitSelected}
            style={unitStyle}
          />)}
      </Drawer>)}
      <Drawer
        key={'dice-drawer'}
        actions={this.props.diceDrawerActions}
        onAction={this.onDiceAction}
        style={{ backgroundColor: '#85929E' }}
      >
        {this.props.unitDices.map(dice => <Dice
          key={dice.id}
          face={dice.face}
          style={diceStyle}
          showHighlight={checkCondition(PlayerQuerySelectTarget.DICE, dice, this.props.activeUnitQuery)}
          selected={dice.isSelected}
          onClick={this.onDiceClick(dice)}
          description={JSON.stringify(dice, null, 2)}
        />)}
      </Drawer>
      <Drawer
        key={'card-drawer'}
        actions={this.props.cardDrawerActions}
        onAction={this.onCardAction}
        style={{ backgroundColor: '#85929E' }}
      >
        {this.props.unitCards.map(card => <Card
          key={card.id}
          id={card.id}
          name={card.id}
          style={cardStyle}
          diceSlot={card.require}
          diceSlotEmpty={!card.isActive}
          showSlot={true}
          showPlayButton={checkCondition(PlayerQuerySelectTarget.CARD, card, this.props.activeUnitQuery)}
          onDiceSlotClick={this.onCardSlotClick}
          onClick={this.onCardClick}
          description={JSON.stringify(card, null, 2)}/>)}
      </Drawer>
      <Drawer
        key={'turn-unit-card-drawer'}
        actions={[]}
        onAction={this.onCardAction}
        style={{ backgroundColor: '#85929E' }}
      >
        {this.props.activeTurnCards.map(card => <TurnMarker style={{ border: '1px solid black' }} activeUnitCard={card} onSelect={() => {
        }} onSelectButton={() => {
        }}/>)}
      </Drawer>
    </div>
  }
}

const mapDispatchToProps = function (dispatch: Dispatch<any>): BattleViewDispatchProps {
  return {
    onActiveUnitSelected: unitId => dispatch(setActiveUnitId(unitId)),
    onPlayerIdAssigned: playerId => dispatch(playerIdAssigned(playerId)),
    onDiceSelectRequest: (unitId: string, diceId: string) => dispatch(request(unitId, diceSelectRequest(diceId))),
    onRollDicesRequest: (unitId: string) => dispatch(request(unitId, rollDicesRequest())),
    onKeepDices: unitId => dispatch(request(unitId, keepDicesRequest())),
    onAcceptAssignment: () => dispatch(acceptAssignment()),
    onCardSelected: (unitId, cardId: PlayerCard) => dispatch(request(unitId, cardPlayRequest(cardId))),
    onUnitSelected: (unitId, targetUnitId) => dispatch(request(unitId, unitSelectRequest(targetUnitId))),
    onGroupSelected: (unitId, targetGroupId) => dispatch(request(unitId, groupSelectRequest(targetGroupId))),
  }
}

const mapStateToProps = function (state: any, ownProps: BattleViewContainerProps): BattleViewStateProps {
  const battleState: BattleState = ownProps.battleStateSelector(state)
  const battleViewState: BattleViewState = ownProps.battleViewStateSelector(state)
  const unitId = battleViewState.activeUnitId
  const props: BattleSelectorProps = { unitId }
  return {
    activeUnitId: unitId,
    activeUnitQuery: unitQuerySelector(battleState, props),
    groupsWithUnits: groupsWithUnitsSelector(battleState),
    // turns: turnsSelector(battleState, {activeUnitId}),
    diceDrawerActions: diceDrawerActionsSelector(battleState, props),
    cardDrawerActions: cardDrawerActionsSelector(battleState, props),
    unitCards: activeUnitCardsSelector(battleState, props),
    unitDices: activeUnitDicesSelector(battleState, props),
    activeTurnCards: activeTurnCardsSelector(battleState, props),
  }
}

// noinspection JSUnusedGlobalSymbols
export default connect<BattleViewStateProps, BattleViewDispatchProps, BattleViewContainerProps>(mapStateToProps, mapDispatchToProps)(BattleView)

