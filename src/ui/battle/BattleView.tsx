import * as React from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import Dice from '../common/Dice'
import Drawer, {DrawerAction} from '../common/Drawer'
import {Card} from '../common/Card'
import {Unit} from '../common/Unit'
import {GroupState, UnitState, BattleState, BattleViewState} from './battle-reducer'
import {
    acceptAssignment,
    assignDiceToCard,
    keepDices,
    unassignDiceFromCard,
    cardPlay, playerIdAssigned, playerQueryResponse, setActiveUnitId, rollDicesRequest
} from './battle-actions'
import {
    cardDrawerActionsSelector, diceDrawerActionsSelector, groupsWithUnitsSelector, UICard, UIDice,
    UIGroup, unitCardsSelector, unitDicesSelector
} from './battle-selectors'

const diceStyle = {
    margin: '2px'
}

const cardStyle = {
    margin: '10px'
}

const unitStyle = {
    margin: '10px'
}

export interface BattleViewStateProps {
    activeUnitId: string
    diceDrawerActions: DrawerAction[]
    cardDrawerActions: DrawerAction[]
    groupsWithUnits: UIGroup[]
    unitDices: UIDice[]
    unitCards: UICard[]
}

export interface BattleViewDispatchProps {
    onActiveUnitSelected: (unitId: string) => void
    onPlayerIdAssigned: (playerId: string) => void
    onAssignDiceToCard: (diceId: string, cardId: string) => void
    onUnassignDiceFromCard: (diceId: string | undefined, cardId: string | undefined) => void
    onRollDicesRequest: (unitId: string) => void
    onKeepDices: () => void
    onAcceptAssignment: () => void
    onCardPlay: (cardId: string) => void
    onPlayerQueryResponse: (value: any) => void
}

export interface BattleViewContainerProps {
    battleStateSelector: (state: any) => BattleState
    battleViewStateSelector: (state: any) => BattleViewState
}

export type BattleViewProps = BattleViewStateProps & BattleViewDispatchProps & BattleViewContainerProps


export class BattleView extends React.Component<BattleViewProps, any> {

    constructor() {
        super()
    }

    componentDidMount() {
        this.props.onPlayerIdAssigned('player1')
    }

    onDiceClick = (selectedDice: UIDice) => () => {
        /*if (this.props.rolls === 0 || this.props.dices.every(dice => dice.face === 0)) {
            return
        }

        const matchingAssignment = this.props.diceToCardAssignments.filter(assignment => assignment.diceId === selectedDice.id)[0]

        if (matchingAssignment) {
            this.props.onUnassignDiceFromCard(selectedDice.id, undefined)
        } else {
            const matchingCard = this.props.cards
                .filter(card => card.require === selectedDice.face)
                .filter(card => this.props.diceToCardAssignments.filter(assignment => assignment.cardId === card.id))[0]

            if (matchingCard) {
                this.props.onAssignDiceToCard(selectedDice.id, matchingCard.id)
            } else {
                this.props.onAssignDiceToCard(selectedDice.id, 'none')
            }
        }*/
    }

    onDiceAction = (action: DrawerAction) => {
        if (action.id === 'roll') {
            this.props.onRollDicesRequest(this.props.activeUnitId)
        }
        /*if (action.id === 'roll') {
            const newDices = this.props.dices.map(dice => {
                if (this.props.diceToCardAssignments.filter(assignment => assignment.diceId === dice.id)[0] !== undefined) {
                    return dice
                }
                return {...dice, face: getRandomArbitrary(1, 7)}
            }).sort((a, b) => a.face - b.face)

            this.props.onRollDicesResult(newDices)
        }
        if (action.id === 'keep') {
            this.props.onKeepDices()
        }*/
    }

    onCardSlotClick = (cardId: string, face: number) => {
        /*const diceToPut = this.props.dices
            .filter(d => d.face === face)
            .filter(card => this.props.diceToCardAssignments.filter(assignment => assignment.cardId === cardId)[0] === undefined)[0]
        if (diceToPut) {
            const existingAssignment = this.props.diceToCardAssignments.filter(a => a.cardId === cardId && a.diceId === diceToPut.id)[0]
            if (existingAssignment) {
                this.props.onUnassignDiceFromCard(diceToPut.id, cardId)
            } else {
                this.props.onAssignDiceToCard(diceToPut.id, cardId)
            }
        }*/
    }

    onCardAction = (action: DrawerAction) => {
        if (action.id === 'accept-assignment') {
            this.props.onAcceptAssignment()
        }
    }

    onGroupAction = (action: DrawerAction) => {

    }

    onCardClick = (cardId: string) => {
        this.props.onCardPlay(cardId)
    }

    onActiveUnitSelected = (unitId: string) => {
        this.props.onActiveUnitSelected(unitId)
    }

    onUnitSelected = (unitId: string) => {
        this.props.onPlayerQueryResponse(unitId)
    }

    render() {
        return <div>
            {this.props.groupsWithUnits.map(group => <Drawer
                key={group.id}
                actions={[
                    {
                        id: 'select',
                        name: 'Select',
                        disabled: true,
                        visible: true
                    }
                ]}
                onAction={this.onGroupAction}
                style={{backgroundColor: '#BDC3CF'}}
            >
                {group.units
                    .map(unit => <Unit
                        key={unit.id}
                        id={unit.id}
                        name={unit.name}
                        showSelectButton={unit.showSelectButton}
                        onSelectButton={this.onUnitSelected}
                        onSelect={this.onActiveUnitSelected}
                        style={unitStyle}
                    />)}
            </Drawer>)}
            <Drawer
                key='dice-drawer'
                actions={this.props.diceDrawerActions}
                onAction={this.onDiceAction}
                style={{backgroundColor: '#85929E'}}
            >
                {this.props.unitDices.map(dice => <Dice
                    key={dice.id}
                    face={dice.face}
                    style={diceStyle}
                    selected={dice.isSelected}
                    onClick={this.onDiceClick(dice)}
                />)}
            </Drawer>
            <Drawer
                key='card-drawer'
                actions={this.props.cardDrawerActions}
                onAction={this.onCardAction}
                style={{backgroundColor: '#85929E'}}
            >
                {this.props.unitCards.map(card => <Card
                    key={card.id}
                    id={card.id}
                    name={card.id}
                    style={cardStyle}
                    diceSlot={card.require}
                    diceSlotEmpty={card.isSlotEmpty}
                    showSlot={true}
                    showPlayButton={true}
                    onDiceSlotClick={this.onCardSlotClick}
                    onClick={this.onCardClick}
                    description={'Spell that targets ' + card.target}/>)}
            </Drawer>
        </div>
    }
}

const mapDispatchToProps = function (dispatch: Dispatch<any>): BattleViewDispatchProps {
    return {
        onActiveUnitSelected: (unitId) => dispatch(setActiveUnitId(unitId)),
        onPlayerIdAssigned: (playerId) => dispatch(playerIdAssigned(playerId)),
        onAssignDiceToCard: (diceId: string, cardId: string) => dispatch(assignDiceToCard(diceId, cardId)),
        onUnassignDiceFromCard: (diceId: string | undefined, cardId: string | undefined) => dispatch(unassignDiceFromCard(diceId, cardId)),
        onRollDicesRequest: (unitId: string) => dispatch(rollDicesRequest(unitId)),
        onKeepDices: () => dispatch(keepDices()),
        onAcceptAssignment: () => dispatch(acceptAssignment()),
        onCardPlay: (cardId: string) => dispatch(cardPlay(cardId)),
        onPlayerQueryResponse: (selection: UnitState | GroupState) => dispatch(playerQueryResponse(selection))
    }
}

const mapStateToProps = function (state: any, ownProps: BattleViewContainerProps): BattleViewStateProps {
    const battleState: BattleState = ownProps.battleStateSelector(state)
    const battleViewState: BattleViewState = ownProps.battleViewStateSelector(state)
    const activeUnitId = battleViewState.activeUnitId
    return {
        activeUnitId: activeUnitId,
        groupsWithUnits: groupsWithUnitsSelector(battleState, {activeUnitId}),
        diceDrawerActions: diceDrawerActionsSelector(battleState, {activeUnitId}),
        cardDrawerActions: cardDrawerActionsSelector(battleState, {activeUnitId}),
        unitCards: unitCardsSelector(battleState, {activeUnitId}),
        unitDices: unitDicesSelector(battleState, {activeUnitId})
    }
}

const BattleViewContainer = connect<BattleViewStateProps, BattleViewDispatchProps, BattleViewContainerProps>(mapStateToProps, mapDispatchToProps)(BattleView)

export default BattleViewContainer
