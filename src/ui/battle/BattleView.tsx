import * as React from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import Dice from '../common/Dice'
import Drawer, {DrawerAction} from '../common/Drawer'
import {Card} from '../common/Card'
import {UnitComponent} from '../common/UnitComponent'
import { BattleState, BattleViewState, PlayerQuery} from './battle-reducer'
import {
    acceptAssignment,
    keepDicesRequest,
    cardPlayRequest, playerIdAssigned, setActiveUnitId, rollDicesRequest, assignDiceRequest,
    unitSelectRequest
} from './battle-actions'
import {
    cardDrawerActionsSelector, diceDrawerActionsSelector, groupsWithUnitsSelector, ActiveUnitCard, ActiveUnitDice,
    Group, unitCardsSelector, unitDicesSelector
} from './battle-selectors'
import {checkCondition} from "./battle-utils";

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
    query: PlayerQuery,
    activeUnitId: string
    diceDrawerActions: DrawerAction[]
    cardDrawerActions: DrawerAction[]
    groupsWithUnits: Group[]
    unitDices: ActiveUnitDice[]
    unitCards: ActiveUnitCard[]
}

export interface BattleViewDispatchProps {
    onActiveUnitSelected: (unitId: string) => void
    onPlayerIdAssigned: (playerId: string) => void
    onAssignDiceRequest: (unitId:string, diceId: string) => void
    onRollDicesRequest: (unitId: string) => void
    onKeepDices: (unitId:string) => void
    onAcceptAssignment: () => void
    onCardSelected: (unitId:string,cardId: string) => void
    onUnitSelected: (unitId:string,targetUnitId: string) => void
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

    onDiceClick = (selectedDice: ActiveUnitDice) => () => {
        this.props.onAssignDiceRequest(this.props.activeUnitId, selectedDice.id)
    }

    onDiceAction = (action: DrawerAction) => {
        if (action.id === 'roll') {
            this.props.onRollDicesRequest(this.props.activeUnitId)
        }
        if (action.id === 'keep') {
            this.props.onKeepDices(this.props.activeUnitId)
        }
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
        this.props.onCardSelected(this.props.activeUnitId,cardId)
    }

    onActiveUnitSelected = (unitId: string) => {
        console.log('active unit selected')
        this.props.onActiveUnitSelected(unitId)
    }

    onUnitSelected = (unitId: string) => {
        console.log('unit selected')
        this.props.onUnitSelected(this.props.activeUnitId,unitId)
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
                    .map(unit => <UnitComponent
                        key={unit.id}
                        unit={unit}
                        debug={true}
                        showSelectButton={checkCondition('unit', unit, this.props.query)}
                        onSelectButton={this.onUnitSelected}
                        onSelect={this.onActiveUnitSelected}
                        style={unitStyle}
                    />)}
            </Drawer>)}
            {/*<Drawer
                key='turn-drawer'
                actions={[]}
                onAction={()=>{}}
                style={{backgroundColor: '#85929E'}}
            >
                {this.props.turns.map(turn => <Turn
                    key={dice.id}
                    face={dice.face}
                    style={diceStyle}
                    selected={dice.isSelected}
                    onClick={this.onDiceClick(dice)}
                />)}
            </Drawer>*/}
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
                    description={JSON.stringify(dice,null,2)}
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
                    diceSlotEmpty={card.diceId === 'none'}
                    showSlot={true}
                    showPlayButton={checkCondition('card',card, this.props.query)}
                    onDiceSlotClick={this.onCardSlotClick}
                    onClick={this.onCardClick}
                    description={JSON.stringify(card,null,2)}/>)}
            </Drawer>
        </div>
    }
}

const mapDispatchToProps = function (dispatch: Dispatch<any>): BattleViewDispatchProps {
    return {
        onActiveUnitSelected: (unitId) => dispatch(setActiveUnitId(unitId)),
        onPlayerIdAssigned: (playerId) => dispatch(playerIdAssigned(playerId)),
        onAssignDiceRequest: (unitId:string,diceId: string) => dispatch(assignDiceRequest(unitId,diceId)),
        onRollDicesRequest: (unitId: string) => dispatch(rollDicesRequest(unitId)),
        onKeepDices: (unitId) => dispatch(keepDicesRequest(unitId)),
        onAcceptAssignment: () => dispatch(acceptAssignment()),
        onCardSelected: (unitId,cardId: string) => dispatch(cardPlayRequest(unitId,cardId)),
        onUnitSelected: (unitId,targetUnitId) => dispatch(unitSelectRequest(unitId, targetUnitId))
    }
}

const mapStateToProps = function (state: any, ownProps: BattleViewContainerProps): BattleViewStateProps {
    const battleState: BattleState = ownProps.battleStateSelector(state)
    const battleViewState: BattleViewState = ownProps.battleViewStateSelector(state)
    const activeUnitId = battleViewState.activeUnitId
    return {
        query: battleState.query,
        activeUnitId: activeUnitId,
        groupsWithUnits: groupsWithUnitsSelector(battleState, {activeUnitId}),
        //turns: turnsSelector(battleState, {activeUnitId}),
        diceDrawerActions: diceDrawerActionsSelector(battleState, {activeUnitId}),
        cardDrawerActions: cardDrawerActionsSelector(battleState, {activeUnitId}),
        unitCards: unitCardsSelector(battleState, {activeUnitId}),
        unitDices: unitDicesSelector(battleState, {activeUnitId})
    }
}

const BattleViewContainer = connect<BattleViewStateProps, BattleViewDispatchProps, BattleViewContainerProps>(mapStateToProps, mapDispatchToProps)(BattleView)

export default BattleViewContainer
