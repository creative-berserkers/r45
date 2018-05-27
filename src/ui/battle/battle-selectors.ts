import { createSelector } from 'reselect'
import {
  PlayerQuery,
  BattleState,
  PlayerCard, UnitState, GroupState, CardState,
} from './battle-reducer'
import { filterIdMap, IdMap, mapValues } from './battle-utils'

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
  rolls: number
  query: PlayerQuery[]
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

export const enhancedGroupsSelector = createSelector<BattleState, IdMap<GroupState>, IdMap<UnitState>, IdMap<CardState>, EnhancedGroup[]>(
  groupsSelector,
  unitsSelector,
  cardsSelector,
  (groups, units, cards) => mapValues<GroupState, EnhancedGroup>(groups, group => ({
    ...group,
    units: mapValues<UnitState, EnhancedUnit>(filterIdMap<UnitState>(units, unit => unit.groupId === group.id), unit => ({
      id: unit.id,
      name: unit.name,
      rolls: unit.rolls,
      query: unit.query,
      health: unit.baseHealth - unit.damage,
      cards: unit.assignedCardsIds.map(cardId => cards[cardId]),
      diceRolls: mapValues(unit.diceRolls),
    })),
  })),
)
