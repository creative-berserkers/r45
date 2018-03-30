import { createSelector } from 'reselect'
import {
  PlayerQuery,
  BattleState,
  PlayerQuerySelectTarget,
  PlayerCard, UnitState, GroupState, CardState, DiceRollState, StateMap,
} from './battle-reducer'
import { DrawerAction } from '../common/Drawer'
import { checkCondition, filterIdMap, findIdMapValue, IdMap, mapIdMapValues, mapValues } from './battle-utils'

export interface BattleSelectorProps {
  unitId: string
}

export interface EnhancedDiceRoll {
  id: string
  type: string
  rollResult: number
  card: PlayerCard
}

export interface EnhancedUnit {
  id: string
  name: string
  groupId: string
  playerId: string
  baseHealth: number
  damage: number
  rolls: number
  query: PlayerQuery[]
  assignedCardsIds: string[]
  diceRolls: EnhancedDiceRoll[]
  health: number
  cards: CardState[]
}

export interface EnhancedGroup extends GroupState {
  id: string
  units: EnhancedUnit[]
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
export const unitsSelector = (state: BattleState) => state.units
export const enhancedUnitsSelector = createSelector<BattleState, IdMap<UnitState>, IdMap<CardState>, EnhancedUnit[]>(
  unitsSelector,
  cardsSelector,
  (units, cards): EnhancedUnit[] => mapValues<UnitState, EnhancedUnit>(units, (unitId, unit) => ({
    ...unit,
    health: unit.baseHealth - unit.damage,
    cards: unit.assignedCardsIds.map(cardId => cards[cardId]),
    diceRolls: mapValues(unit.diceRolls),
  })),
)
export const enhancedGroupsSelector = createSelector<BattleState, IdMap<GroupState>, EnhancedUnit[], EnhancedGroup[]>(
  groupsSelector,
  enhancedUnitsSelector,
  (groups, units) => mapValues<GroupState, EnhancedGroup>(groups, (groupId, group) => ({
    ...group,
    units: units.filter(unit => unit.groupId === groupId),
  })),
)

export const dicesSelector = (state: BattleState) => state.dices

export const unitSelector = createSelector<BattleState, BattleSelectorProps, string, IdMap<UnitState>, UnitState | undefined>(
  activeUnitIdSelector,
  unitsSelector,
  (activeUnitId, units) => {
    return units[activeUnitId]
  },
)

export const unitQuerySelector = createSelector<BattleState, BattleSelectorProps, EnhancedUnit | undefined, PlayerQuery[]>(
  unitSelector,
  unit => (unit ? unit.query : [{ select: PlayerQuerySelectTarget.NONE }]),
)

export const diceDrawerActionsSelector = createSelector<BattleState, BattleSelectorProps, EnhancedUnit | undefined, DrawerAction[]>(
  unitSelector,
  (activeUnit?: EnhancedUnit): DrawerAction[] => activeUnit ? [
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

export const cardDrawerActionsSelector = createSelector<BattleState, BattleSelectorProps, EnhancedUnit | undefined, DrawerAction[]>(
  unitSelector,
  (activeUnit?: EnhancedUnit): DrawerAction[] => activeUnit ? [
    {
      id: 'accept-assignment',
      name: 'Accept',
      disabled: activeUnit.rolls === 0,
    },
  ] : [],
)

export const groupsWithUnitsSelector = createSelector(
  groupsSelector,
  unitsSelector,
  (groupMap, units): EnhancedGroup[] => Object.keys(groupMap).map(groupId => ({
    id: groupId,
    units: mapValues(units).filter(unit => unit.groupId === groupId),
  })),
)

export const unitGroupSelector = createSelector(
  activeUnitIdSelector,
  groupsWithUnitsSelector,
  (unitId: string, groups: EnhancedGroup[]) => {
    return groups.find(group => group.units.find(unit => unit.id === unitId) !== undefined)
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

