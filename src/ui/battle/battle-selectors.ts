import { createSelector } from 'reselect'
import {
  DiceToCardAssignment,
  PlayerQuery,
  CardToUnitAssignment,
  BattleState,
  PlayerQuerySelectTarget,
  PlayerCard,
} from './battle-reducer'
import { DrawerAction } from '../common/Drawer'
import { checkCondition, findIdMapValue } from './battle-utils'

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
  canBeAssignedToCard: boolean
}

export interface ActiveUnitCard {
  id: PlayerCard
  unitId: string
  require: number
  target: string
  isActive: boolean
  initiative: number
}

export interface ActiveUnitCardWithCanBePlayed extends ActiveUnitCard {
  canBePlayedInCurrentTurn: boolean
}

export type BattleStateSelector = (state: any) => BattleState

export const activeUnitIdSelector = (state: BattleState, props: BattleSelectorProps) => props.unitId
export const cardsSelector = (state: BattleState) => state.cards
export const groupsSelector = (state: BattleState) => state.groups
export const unitsSelector = (state: BattleState): Unit[] => Object.keys(state.units).map((unitId) => {
  const unit = state.units[unitId]
  return {
    id: unit.id,
    groupId: unit.groupId,
    health: unit.baseHealth - unit.damage,
    name: unit.name,
    phase: unit.phase,
    rolls: unit.rolls,
    query: unit.query,
  }
})
export const dicesSelector = (state: BattleState) => state.dices
export const diceToCardAssignmentsSelector = (state: BattleState) => state.diceToCardAssignments
export const cardToUnitAssignmentsSelector = (state: BattleState) => state.cardToUnitAssignments

export const unitSelector = createSelector<BattleState, BattleSelectorProps, string, Unit[], Unit | undefined>(
  activeUnitIdSelector,
  unitsSelector,
  (activeUnitId, units) => {
    return units.find(unit => unit.id === activeUnitId)
  },
)

export const unitQuerySelector = createSelector<BattleState, BattleSelectorProps, Unit | undefined, PlayerQuery[]>(
  unitSelector,
  (unit: Unit | undefined) => {
    return unit ? unit.query : [{ select: PlayerQuerySelectTarget.NONE }]
  },
)

export const diceDrawerActionsSelector = createSelector<BattleState, BattleSelectorProps, Unit | undefined, DrawerAction[]>(
  unitSelector,
  (activeUnit?: Unit): DrawerAction[] => activeUnit ? [
    {
      id: 'roll',
      name: `Roll(${activeUnit.rolls})`,
    },
    {
      id: 'keep',
      name: 'Keep',
    },
  ].map(action => ({
    ...action,
    visible: checkCondition(PlayerQuerySelectTarget.DICE_ACTION, action, activeUnit.query),
  })) : [],
)

export const cardDrawerActionsSelector = createSelector<BattleState, BattleSelectorProps, Unit | undefined, DrawerAction[]>(
  unitSelector,
  (activeUnit?: Unit): DrawerAction[] => activeUnit ? [
    {
      id: 'accept-assignment',
      name: 'Accept',
      disabled: activeUnit.rolls === 0,
      visible: activeUnit.phase === 'assigning',
    },
  ] : [],
)

export const groupsWithUnitsSelector = createSelector(
  groupsSelector,
  unitsSelector,
  (groupMap, units): Group[] => Object.keys(groupMap).map(groupId => ({
    id: groupId,
    units: units.filter(unit => unit.groupId === groupId),
  })),
)

export const unitGroupSelector = createSelector(
  activeUnitIdSelector,
  groupsWithUnitsSelector,
  (unitId: string, groups: Group[]) => {
    return groups.find(group => group.units.find(unit => unit.id === unitId) !== undefined)
  },
)

export const unitDiceToCardAssignmentsSelector = createSelector(
  activeUnitIdSelector,
  diceToCardAssignmentsSelector,
  (activeUnitId, diceToCardAssignmentsMap): DiceToCardAssignment[] => {
    return Object.keys(diceToCardAssignmentsMap)
      .map(assId => diceToCardAssignmentsMap[assId])
      .filter(ass => ass.unitId === activeUnitId)
  },
)

export const activeCardsSelector = createSelector(
  cardsSelector,
  cardToUnitAssignmentsSelector,
  diceToCardAssignmentsSelector,
  (cardsMap,
   cardToUnitAssignmentMap,
   diceToCardAssignmentsMap): ActiveUnitCard[] => Object.keys(cardToUnitAssignmentMap)
    .map(assignmentKey => cardToUnitAssignmentMap[assignmentKey])
    .reduce((acc: ActiveUnitCard[], ass: CardToUnitAssignment) => {
      const card = cardsMap[ass.cardId]
      if (card) {
        acc.push({
          id: card.id,
          unitId: ass.unitId,
          require: card.require,
          target: card.target,
          initiative: card.initiative,
          isActive: findIdMapValue(diceToCardAssignmentsMap,
            a => a.cardId === card.id && a.unitId === ass.unitId) !== undefined,
        })
      }
      return acc
    }, []),
)

export const activeTurnCardsSelector = createSelector(
  activeUnitIdSelector,
  activeCardsSelector,
  (activeUnitId, activeCards): ActiveUnitCard[] => activeCards
    .filter(card => card.isActive === true)
    .sort((cardA, cardB) => cardB.initiative - cardA.initiative),
)

export const currentTurnCardSelector = createSelector(
  activeTurnCardsSelector,
  (activeTurnCards): ActiveUnitCard => activeTurnCards[0],
)

export const activeCardsThatCanBePlayedSelector = createSelector(
  activeCardsSelector,
  currentTurnCardSelector,
  (activeCards, currentTurnCard): ActiveUnitCardWithCanBePlayed[] => activeCards
    .map((card: ActiveUnitCard): ActiveUnitCardWithCanBePlayed => ({
      ...card,
      canBePlayedInCurrentTurn: (currentTurnCard !== undefined) && (card.id === currentTurnCard.id),
    })),
)


export const activeUnitCardsSelector = createSelector(
  activeUnitIdSelector,
  activeCardsThatCanBePlayedSelector,
  (activeUnitId, activeCards): ActiveUnitCardWithCanBePlayed[] => activeCards
    .filter(card => card.unitId === activeUnitId),
)

export const activeUnitDicesSelector = createSelector(
  activeUnitIdSelector,
  dicesSelector,
  unitDiceToCardAssignmentsSelector,
  activeUnitCardsSelector,
  (activeUnitId, diceMap, unitDiceToCardAssignments, activeUnitCards): ActiveUnitDice[] => {
    return unitDiceToCardAssignments
      .reduce((acc: ActiveUnitDice[], ass: DiceToCardAssignment) => {
        const dice = diceMap[ass.diceId]
        if (dice) {
          acc.push({
            id: ass.id,
            face: ass.rollResult,
            isSelected: ass.cardId !== 'unassigned' && ass.cardId !== PlayerCard.USED,
            canBeAssignedToCard: activeUnitCards.find(
              card => card.require === ass.rollResult && card.isActive === false) !== undefined,
          })
        }
        return acc
      }, [])
  },
)

