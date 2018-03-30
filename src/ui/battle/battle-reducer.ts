import { BattleActionTypes, BattleViewActionTypes, BattleTypeKeys, BattleViewTypeKeys } from './battle-actions'
import { toIdMap, getUniqueId, updateIdMap, mapIdMapValues } from './battle-utils'


export interface StateMap<T> {
  [key: string]: T
}

export enum WhereClauseType {
  // noinspection JSUnusedGlobalSymbols
  MATCH_ALL = 'match-all',
  MATCH_ANY = 'match-any',
}

export enum WhereClauseOperator {
  EQUAL = '=',
  NOT_EQUAL = '!=',
}

export interface WhereClause {
  type: WhereClauseType
  prop: string
  operator: WhereClauseOperator
  value: undefined | string | string[] | boolean
}

export enum PlayerQuerySelectTarget {
  UNIT = 'unit',
  CARD = 'card',
  GROUP = 'group',
  DICE = 'dice',
  DICE_ACTION = 'dice-action',
  NONE = 'none',
}

export function selectDiceWhereEqual(prop: string, value: any) {
  return {
    select: PlayerQuerySelectTarget.DICE,
    where: [{
      prop,
      value,
      type: WhereClauseType.MATCH_ALL,
      operator: WhereClauseOperator.EQUAL,
    }],
  }
}

export function selectDiceActionWhereEqual(prop: string, value: any) {
  return {
    select: PlayerQuerySelectTarget.DICE_ACTION,
    where: [{
      prop,
      value,
      type: WhereClauseType.MATCH_ALL,
      operator: WhereClauseOperator.EQUAL,
    }],
  }
}

export function selectNone() {
  return {
    select: PlayerQuerySelectTarget.NONE,
  }
}

export enum PlayerCard {
  UNASSIGNED = 'unassigned',
  USED = 'used',
  TELEPORT = 'teleport',
  FIREBALL = 'fireball',
  HEAL = 'heal',
  MANEUVER = 'maneuver',
  AXE = 'axe',
  ARROW = 'arrow',
}

export interface PlayerQuery {
  select: PlayerQuerySelectTarget
  where?: WhereClause[]
}

export type DiceStateFaces = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface DiceState {
  id: string
  faces: [DiceStateFaces, DiceStateFaces, DiceStateFaces, DiceStateFaces, DiceStateFaces, DiceStateFaces]
  source: 'neutral' | 'fire' | 'shadow' | 'nature'
}

export interface CardState {
  id: PlayerCard
  require: number
  initiative: number
  target: 'self'
    | 'local-group'
    | 'remote-group'
    | 'local-unit'
    | 'remote-unit'
}

export interface GroupState {
  id: string
}

export enum PlayCardPhases {
  PLAY_TELEPORT = 'play-teleport',
  PLAY_FIREBALL = 'play-fireball',
}

export enum RollingPhases {
  ROLLING = 'rolling',
  REROLLING = 'rerolling',
  WAITING_FOR_OTHERS = 'waiting-for-others',
  PLAYING_CARDS = 'playing-cards',
}

export type BattlePhases = PlayCardPhases | RollingPhases

export interface DiceRollState {
  id: string
  type: string
  rollResult: number
  card: PlayerCard
}

export interface UnitState {
  id: string
  name: string
  groupId: string
  playerId: string
  baseHealth: number
  damage: number
  rolls: number
  query: PlayerQuery[]
  assignedCardsIds: string[]
  diceRolls: StateMap<DiceRollState>
}

export interface BattleState {
  dices: StateMap<DiceState>
  cards: StateMap<CardState>
  groups: StateMap<GroupState>
  units: StateMap<UnitState>
}

export const INIT_ROLLS = 2

export const INITIAL_STATE: BattleState = {
  dices: toIdMap<DiceState>([
    { id: 'dice1', faces: [1, 2, 3, 4, 5, 6], source: 'neutral' },
  ]),
  cards: toIdMap<CardState>([
    {
      id: PlayerCard.HEAL,
      require: 1,
      target: 'self',
      initiative: 20,
    },
    {
      id: PlayerCard.MANEUVER,
      require: 3,
      target: 'self',
      initiative: 30,
    },
    {
      id: PlayerCard.TELEPORT,
      require: 5,
      target: 'self',
      initiative: 80,
    },
    {
      id: PlayerCard.FIREBALL,
      require: 6,
      target: 'remote-unit',
      initiative: 60,
    },
    {
      id: PlayerCard.AXE,
      require: 6,
      target: 'local-unit',
      initiative: 50,
    },
    {
      id: PlayerCard.ARROW,
      require: 6,
      target: 'remote-unit',
      initiative: 70,
    },
  ]),
  groups: toIdMap<GroupState>([
    { id: 'group1' },
    { id: 'group2' },
    { id: 'group3' },
  ]),
  units: toIdMap<UnitState>([
    {
      id: 'unit1',
      name: 'Unit1',
      groupId: 'group1',
      playerId: 'player1',
      rolls: INIT_ROLLS,
      baseHealth: 10,
      damage: 0,
      query: [],
      assignedCardsIds: [PlayerCard.MANEUVER,PlayerCard.AXE],
      diceRolls: toIdMap<DiceRollState>([
        { id: getUniqueId('dice'), type: 'dice1', rollResult: 0, card: PlayerCard.UNASSIGNED  },
        { id: getUniqueId('dice'), type: 'dice1', rollResult: 0, card: PlayerCard.UNASSIGNED  },
      ]),
    },
    {
      id: 'unit2',
      name: 'Unit2',
      groupId: 'group3',
      playerId: 'player1',
      rolls: INIT_ROLLS,
      baseHealth: 10,
      damage: 0,
      query: [],
      assignedCardsIds: [PlayerCard.HEAL, PlayerCard.MANEUVER, PlayerCard.TELEPORT, PlayerCard.FIREBALL],
      diceRolls: toIdMap<DiceRollState>([
        { id: getUniqueId('dice'), type: 'dice1', rollResult: 0, card: PlayerCard.UNASSIGNED  },
        { id: getUniqueId('dice'), type: 'dice1', rollResult: 0, card: PlayerCard.UNASSIGNED  },
        { id: getUniqueId('dice'), type: 'dice1', rollResult: 0, card: PlayerCard.UNASSIGNED  },
        { id: getUniqueId('dice'), type: 'dice1', rollResult: 0, card: PlayerCard.UNASSIGNED  },
      ]),
    },
    {
      id: 'unit3',
      name: 'Unit3',
      groupId: 'group3',
      playerId: 'player1',
      rolls: INIT_ROLLS,
      baseHealth: 10,
      damage: 0,
      query: [],
      assignedCardsIds: [PlayerCard.MANEUVER, PlayerCard.AXE],
      diceRolls: toIdMap<DiceRollState>([
        { id: getUniqueId('dice'), type: 'dice1', rollResult: 0, card: PlayerCard.UNASSIGNED  },
        { id: getUniqueId('dice'), type: 'dice1', rollResult: 0, card: PlayerCard.UNASSIGNED  },
      ]),
    },
  ]),
}

export function battleReducer(state: BattleState = INITIAL_STATE, action: BattleActionTypes): BattleState {
  switch (action.type) {
    case BattleTypeKeys.ASSIGN_DICE_RESPONSE: {
      const { meta: { unitId }, payload: { diceRollId, cardId } } = action
      return {
        ...state,
        units: updateIdMap(state.units, unitId,
          oldUnit => ({ ...oldUnit, diceRolls: updateIdMap(oldUnit.diceRolls, diceRollId, oldDiceRoll => ({ ...oldDiceRoll, type: cardId })) })),
      }
    }
    case BattleTypeKeys.SET_UNIT_DICE_ROLLS: {
      const { meta: { unitId }, payload: diceRolls } = action
      return {
        ...state,
        units: updateIdMap(state.units, unitId,
          oldUnit => ({ ...oldUnit, diceRolls })),
      }
    }
    case BattleTypeKeys.SET_UNIT_PHASE_RESPONSE: {
      const { meta: { unitId }, payload: phase } = action
      return {
        ...state,
        units: updateIdMap(state.units, unitId,
          oldUnit => ({ ...oldUnit, phase })),
      }
    }
    case BattleTypeKeys.SET_UNIT_QUERY_RESPONSE: {
      const { meta: { unitId }, payload: query } = action
      return {
        ...state,
        units: updateIdMap(state.units, unitId,
          oldUnit => ({ ...oldUnit, query })),
      }
    }
    case BattleTypeKeys.SET_UNIT_ROLLS_RESPONSE: {
      const { meta: { unitId }, payload: rolls } = action
      return {
        ...state,
        units: updateIdMap(state.units, unitId, oldUnit => ({ ...oldUnit, rolls })),
      }
    }
    case BattleTypeKeys.DAMAGE_UNIT_RESPONSE: {
      const { meta: { unitId }, payload: damage } = action
      return {
        ...state,
        units: updateIdMap(state.units, unitId, oldUnit => ({ ...oldUnit, damage })),
      }
    }
    case BattleTypeKeys.KILL_UNIT_RESPONSE: {
      const { meta: { unitId } } = action
      // noinspection JSUnusedLocalSymbols
      const { [unitId]: omit, ...rest } = state.units
      return {
        ...state,
        units: rest,
      }
    }
    case BattleTypeKeys.MOVE_UNIT_TO_GROUP_RESPONSE: {
      const { meta: { unitId }, payload: groupId } = action
      return {
        ...state,
        units: updateIdMap(state.units, unitId, oldUnit => ({ ...oldUnit, groupId })),
      }
    }
    case BattleTypeKeys.CARD_PLAY_RESPONSE: {
      const { meta: { unitId }, payload : { phase, select } } = action
      return {
        ...state,
        units: updateIdMap(state.units, unitId, oldUnit => ({
          ...oldUnit,
          phase,
          query: [{
            select,
          }],
        })),
      }
    }
    case BattleTypeKeys.TELEPORT_PLAY_RESPONSE: {
      const { meta: { unitId }, payload: { groupId } } = action
      return {
        ...state,
        units: updateIdMap(mapUnitsToAllPlayingCards(state.units), unitId, oldUnit => ({ ...oldUnit, groupId })),
      }
    }
    default:
      return state
  }
}

export interface BattleViewState {
  activeUnitId: string
}

export const BATTLE_VIEW_INITIAL_STATE: BattleViewState = {
  activeUnitId: 'none',
}

export function battleViewReducer(state: BattleViewState = BATTLE_VIEW_INITIAL_STATE, action: BattleViewActionTypes): BattleViewState {
  switch (action.type) {
    case BattleViewTypeKeys.SET_ACTIVE_UNIT_ID:
      return {
        ...state,
        activeUnitId: action.unitId,
      }
    default:
      return state
  }
}

export const mapUnitsToAllPlayingCards = (units: StateMap<UnitState>) => {
  return mapIdMapValues(units, oldUnit => ({
    ...oldUnit,
    phase: RollingPhases.PLAYING_CARDS,
    query: [{
      select: PlayerQuerySelectTarget.CARD,
      where: [{
        type: WhereClauseType.MATCH_ALL,
        prop: 'diceId',
        operator: WhereClauseOperator.NOT_EQUAL,
        value: 'none',
      },
        {
          type: WhereClauseType.MATCH_ALL,
          prop: 'canBePlayedInCurrentTurn',
          operator: WhereClauseOperator.EQUAL,
          value: true,
        }],
    }],
  }))
}
