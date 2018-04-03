import { createSelector } from 'reselect'
import {
  PlayerQuery,
  BattleState,
  PlayerCard, UnitState, GroupState, CardState,
} from './battle-reducer'
import { IdMap,  mapValues } from './battle-utils'

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

export type BattleStateSelector = (state: any) => BattleState

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
