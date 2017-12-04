import {createSelector} from 'reselect'
import {
    CardState, DiceState, DiceToCardAssignment, GroupState, INIT_ROLLS, PlayerQuery,
    UnitToGroupAssignment,
    CardToUnitAssignment, BattleState, DiceToUnitAssignment, PlayerQuerySelectTarget,
} from './battle-reducer'
import {DrawerAction} from '../common/Drawer';
import {checkCondition} from "./battle-utils";

export interface BattleSelectorProps {
    unitId: string
}

export interface Unit {
    id: string
    groupId: string
    health: number
    name: string
    phase: string
    rolls: number
    query: PlayerQuery[]
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

export const activeUnitIdSelector = (state: BattleState, props: BattleSelectorProps) => props.unitId
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
        rolls: unit.rolls,
        query: unit.query
    }
})
export const dicesSelector = (state: BattleState, props: BattleSelectorProps) => state.dices
export const diceToCardAssignmentsSelector = (state: BattleState, props: BattleSelectorProps) => state.diceToCardAssignments
export const cardToUnitAssignmentsSelector = (state: BattleState, props: BattleSelectorProps) => state.cardToUnitAssignments
export const diceToUnitAssignmentsSelector = (state: BattleState, props: BattleSelectorProps) => state.diceToUnitAssignments
export const unitToGroupAssignmentsSelector = (state: BattleState, props: BattleSelectorProps) => state.unitToGroupAssignments


export const unitSelector = createSelector<BattleState,BattleSelectorProps,string,Unit[],Unit|undefined>(
  activeUnitIdSelector,
  unitsSelector,
  (activeUnitId, units) => {
    return units.find(unit => unit.id === activeUnitId)
  }
)

export const unitQuerySelector = createSelector<BattleState,BattleSelectorProps,Unit|undefined, PlayerQuery[]>(
    unitSelector,
    (unit:Unit|undefined) => {
        return unit ? unit.query : [{select:PlayerQuerySelectTarget.NONE}]
    }
)

export const diceDrawerActionsSelector = createSelector<BattleState, BattleSelectorProps,Unit|undefined, DrawerAction[]>(
  unitSelector,
  (activeUnit:Unit):DrawerAction[]=>activeUnit ? [
    {
      id: 'roll',
      name: `Roll(${activeUnit.rolls})`
    },
    {
      id: 'keep',
      name: 'Keep'
    }
  ].map(action => ({...action, visible:checkCondition(PlayerQuerySelectTarget.DICE_ACTION, action, activeUnit.query)})) : []
)

export const cardDrawerActionsSelector = createSelector<BattleState, BattleSelectorProps, Unit | undefined, DrawerAction[]>(
    unitSelector,
    (activeUnit:Unit): DrawerAction[] => activeUnit ? [
        {
            id: 'accept-assignment',
            name: 'Accept',
            disabled: activeUnit.rolls === 0,
            visible: activeUnit.phase === 'assigning'
        }
    ] : []
)

export const groupsWithUnitsSelector = createSelector<BattleState, BattleSelectorProps, GroupState[], Unit[], UnitToGroupAssignment[], Group[]>(
    groupsSelector,
    unitsSelector,
    unitToGroupAssignmentsSelector,
    (groups, units, unitToGroupAssignments): Group[] => groups.map(group => ({
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

export const unitGroupSelector = createSelector<BattleState,BattleSelectorProps,string,Group[],Group|undefined>(
    activeUnitIdSelector,
    groupsWithUnitsSelector,
    (unitId:string, groups:Group[]) => {
        return groups.find(group => group.units.find(unit => unit.id === unitId) !== undefined)
    }
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