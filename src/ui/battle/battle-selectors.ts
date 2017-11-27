import {createSelector} from 'reselect'
import {
    CardState, DiceState, DiceToCardAssignment, GroupState, INIT_ROLLS, PlayerQuery, UnitState,
    UnitToGroupAssignment,
    CardToUnitAssignment, BattleState, DiceToUnitAssignment,
} from './battle-reducer'
import {DrawerAction} from '../common/Drawer';

export interface BattleSelectorProps {
    activeUnitId: string
}

export interface Unit {
    id: string
    groupId: string
    health: number
    name: string
    phase: string
    rolls: number
}

export interface Group {
    id: string
    units: Unit[]
}

export interface ActiveUnitDice {
    id: string
    face: number
    isSelected: boolean
}

export interface ActiveUnitCard {
    id: string
    require: number
    target: string
    diceId: string
}

export type BattleStateSelector = (state:any) => BattleState

export const activeUnitIdSelector = (state: BattleState, props: BattleSelectorProps) => props.activeUnitId
export const cardsSelector = (state: BattleState, props: BattleSelectorProps) => state.cards
export const groupsSelector = (state: BattleState, props: BattleSelectorProps) => state.groups
export const unitsSelector = (state: BattleState, props?: BattleSelectorProps):Unit[] => state.units.map(unit => {
    const utga = state.unitToGroupAssignments.find(utga => utga.unitId === unit.id)
    return {
        id: unit.id,
        groupId: (utga && utga.groupId) || 'none',
        health: unit.baseHealth - unit.damage,
        name: unit.name,
        phase: unit.phase,
        rolls: unit.rolls
    }
})
export const dicesSelector = (state: BattleState, props: BattleSelectorProps) => state.dices
export const querySelector = (state: BattleState, props: BattleSelectorProps) => state.query
export const diceToCardAssignmentsSelector = (state: BattleState, props: BattleSelectorProps) => state.diceToCardAssignments
export const cardToUnitAssignmentsSelector = (state: BattleState, props: BattleSelectorProps) => state.cardToUnitAssignments
export const diceToUnitAssignmentsSelector = (state: BattleState, props: BattleSelectorProps) => state.diceToUnitAssignments
export const unitToGroupAssignmentsSelector = (state: BattleState, props: BattleSelectorProps) => state.unitToGroupAssignments


export const activeUnitSelector = createSelector<BattleState,BattleSelectorProps,string,Unit[],Unit|undefined>(
  activeUnitIdSelector,
  unitsSelector,
  (activeUnitId, units) => {
    return units.find(unit => unit.id === activeUnitId)
  })

export const diceDrawerActionsSelector = createSelector<BattleState, BattleSelectorProps,Unit|undefined, DrawerAction[]>(
  activeUnitSelector,
  (activeUnit):DrawerAction[]=>activeUnit ? [
    {
      id: 'roll',
      name: `Roll(${activeUnit.rolls})`,
      disabled: activeUnit.rolls === 0,
      visible: activeUnit.phase === 'rolling'
    },
    {
      id: 'keep',
      name: 'Keep',
      disabled: activeUnit.rolls === INIT_ROLLS,
      visible: activeUnit.phase === 'rolling'
    }
  ] : []
)

export const cardDrawerActionsSelector = createSelector<BattleState, BattleSelectorProps, Unit | undefined, DrawerAction[]>(
    activeUnitSelector,
    (activeUnit): DrawerAction[] => activeUnit ? [
        {
            id: 'accept-assignment',
            name: 'Accept',
            disabled: activeUnit.rolls === 0,
            visible: activeUnit.phase === 'assigning'
        }
    ] : []
)

export const groupsWithUnitsSelector = createSelector<BattleState, BattleSelectorProps, GroupState[], Unit[], PlayerQuery | undefined, UnitToGroupAssignment[], Group[]>(
    groupsSelector,
    unitsSelector,
    querySelector,
    unitToGroupAssignmentsSelector,
    (groups, units, query, unitToGroupAssignments): Group[] => groups.map(group => ({
        id: group.id,
        units: unitToGroupAssignments
            .filter(utga => utga.groupId === group.id)
            .reduce((acc: Unit[], utga: UnitToGroupAssignment): Unit[] => {
                const unit = units.find(unit => unit.id === utga.unitId)
                if (unit) {
                    acc.push(unit)
                }
                return acc
            }, [])
    }))
)

export const unitDicesSelector = createSelector<BattleState, BattleSelectorProps, string, DiceState[], DiceToUnitAssignment[], DiceToCardAssignment[], ActiveUnitDice[]>(
    activeUnitIdSelector,
    dicesSelector,
    diceToUnitAssignmentsSelector,
    diceToCardAssignmentsSelector,
    (activeUnitId, dices, diceToUnitAssignments, diceToCardAssignments): ActiveUnitDice[] => {
        return diceToUnitAssignments
            .filter(ass => ass.unitId === activeUnitId)
            .reduce((acc: DiceState[], ass: DiceToUnitAssignment) => {
                const dice = dices.find(dice => dice.id === ass.diceId)
                if (dice) {
                    acc.push(dice)
                }
                return acc
            }, [])
            .map((dice: DiceState): ActiveUnitDice => ({
                id: dice.id,
                face: dice.face,
                isSelected: diceToCardAssignments.find(a => a.diceId === dice.id) !== undefined
            })).sort((d1,d2) => d1.face - d2.face)
    }
)

export const unitCardsSelector = createSelector<BattleState, BattleSelectorProps, string, CardState[], CardToUnitAssignment[], DiceToCardAssignment[],ActiveUnitDice[], ActiveUnitCard[]>(
    activeUnitIdSelector,
    cardsSelector,
    cardToUnitAssignmentsSelector,
    diceToCardAssignmentsSelector,
    unitDicesSelector,
    (activeUnitId, cards, cardToUnitAssignments, diceToCardAssignments, unitDices): ActiveUnitCard[] => cardToUnitAssignments
        .filter(ass => ass.unitId === activeUnitId)
        .reduce((acc: CardState[], ass: CardToUnitAssignment) => {
            const card = cards.find(card => card.id === ass.cardId)
            if (card) {
                acc.push(card)
            }
            return acc
        }, [])
        .map((card: CardState): ActiveUnitCard => ({
            id: card.id,
            require: card.require,
            target: card.target,
            diceId: diceToCardAssignments
                .filter(a => unitDices.find(d => a.diceId === d.id) !== undefined)
                .reduce((acc,a) => (a.cardId === card.id) ? a.diceId : acc, 'none')
        }))
)

export function getControlledUnits(state: BattleState, playerId: string) {
    return state.unitToPlayerAssignments
        .filter((ass => ass.playerId === playerId))
        .map(ass => ass.unitId)
        .map(unitId => state.units.filter(unit => unit.id === unitId)[0])
        .filter(unit => !!unit)
}