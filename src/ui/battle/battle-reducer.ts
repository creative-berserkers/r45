import { BattleActionTypes, BattleViewActionTypes, BattleTypeKeys, BattleViewTypeKeys } from './battle-actions'
import { toIdMap, getUniqueId, filterIdMap, updateIdMap, mapIdMapValues, everyIdMapValue } from './battle-utils'

export const DICE_TO_CARD_ASSIGNMENT_NAMESPACE = 'diceToCardAssignment'
export const CARD_TO_UNIT_ASSIGNMENT_NAMESPACE = 'cardToUnitAssignment'

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

export interface UnitState {
  id: string
  name: string
  groupId: string
  playerId: string
  baseHealth: number
  damage: number
  rolls: number
  phase: BattlePhases
  query: PlayerQuery[]
}

export interface DiceToCardAssignment {
  id: string
  diceId: string
  cardId: PlayerCard
  unitId: string
  rollResult: number
}

export interface CardToUnitAssignment {
  id: string
  cardId: PlayerCard
  unitId: string
}

export interface BattleState {
  dices: StateMap<DiceState>
  cards: StateMap<CardState>
  groups: StateMap<GroupState>
  units: StateMap<UnitState>
  diceToCardAssignments: StateMap<DiceToCardAssignment>
  cardToUnitAssignments: StateMap<CardToUnitAssignment>
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
      phase: RollingPhases.ROLLING,
      query: [{
        select: PlayerQuerySelectTarget.DICE_ACTION,
        where: [{
          type: WhereClauseType.MATCH_ALL,
          prop: 'id',
          operator: WhereClauseOperator.EQUAL,
          value: 'roll',
        }],
      }],
    },
    {
      id: 'unit2',
      name: 'Unit2',
      groupId: 'group3',
      playerId: 'player1',
      rolls: INIT_ROLLS,
      baseHealth: 10,
      damage: 0,
      phase: RollingPhases.ROLLING,
      query: [{
        select: PlayerQuerySelectTarget.DICE_ACTION,
        where: [{
          type: WhereClauseType.MATCH_ALL,
          prop: 'id',
          operator: WhereClauseOperator.EQUAL,
          value: 'roll',
        }],
      }],
    },
    {
      id: 'unit3',
      name: 'Unit3',
      groupId: 'group3',
      playerId: 'player1',
      rolls: INIT_ROLLS,
      baseHealth: 10,
      damage: 0,
      phase: RollingPhases.ROLLING,
      query: [{
        select: PlayerQuerySelectTarget.DICE_ACTION,
        where: [{
          type: WhereClauseType.MATCH_ALL,
          prop: 'id',
          operator: WhereClauseOperator.EQUAL,
          value: 'roll',
        }],
      }],
    },
  ]),
  diceToCardAssignments: toIdMap<DiceToCardAssignment>([
    { id: getUniqueId(DICE_TO_CARD_ASSIGNMENT_NAMESPACE), unitId: 'unit1', diceId: 'dice1', cardId: PlayerCard.UNASSIGNED, rollResult: 0 },
    { id: getUniqueId(DICE_TO_CARD_ASSIGNMENT_NAMESPACE), unitId: 'unit1', diceId: 'dice1', cardId: PlayerCard.UNASSIGNED, rollResult: 0 },
    { id: getUniqueId(DICE_TO_CARD_ASSIGNMENT_NAMESPACE), unitId: 'unit1', diceId: 'dice1', cardId: PlayerCard.UNASSIGNED, rollResult: 0 },
    { id: getUniqueId(DICE_TO_CARD_ASSIGNMENT_NAMESPACE), unitId: 'unit1', diceId: 'dice1', cardId: PlayerCard.UNASSIGNED, rollResult: 0 },
    { id: getUniqueId(DICE_TO_CARD_ASSIGNMENT_NAMESPACE), unitId: 'unit2', diceId: 'dice1', cardId: PlayerCard.UNASSIGNED, rollResult: 0 },
    { id: getUniqueId(DICE_TO_CARD_ASSIGNMENT_NAMESPACE), unitId: 'unit2', diceId: 'dice1', cardId: PlayerCard.UNASSIGNED, rollResult: 0 },
    { id: getUniqueId(DICE_TO_CARD_ASSIGNMENT_NAMESPACE), unitId: 'unit2', diceId: 'dice1', cardId: PlayerCard.UNASSIGNED, rollResult: 0 },
    { id: getUniqueId(DICE_TO_CARD_ASSIGNMENT_NAMESPACE), unitId: 'unit2', diceId: 'dice1', cardId: PlayerCard.UNASSIGNED, rollResult: 0 },
    { id: getUniqueId(DICE_TO_CARD_ASSIGNMENT_NAMESPACE), unitId: 'unit3', diceId: 'dice1', cardId: PlayerCard.UNASSIGNED, rollResult: 0 },
    { id: getUniqueId(DICE_TO_CARD_ASSIGNMENT_NAMESPACE), unitId: 'unit3', diceId: 'dice1', cardId: PlayerCard.UNASSIGNED, rollResult: 0 },
    { id: getUniqueId(DICE_TO_CARD_ASSIGNMENT_NAMESPACE), unitId: 'unit3', diceId: 'dice1', cardId: PlayerCard.UNASSIGNED, rollResult: 0 },
    { id: getUniqueId(DICE_TO_CARD_ASSIGNMENT_NAMESPACE), unitId: 'unit3', diceId: 'dice1', cardId: PlayerCard.UNASSIGNED, rollResult: 0 },
  ]),
  cardToUnitAssignments: toIdMap<CardToUnitAssignment>([
    { id: getUniqueId(CARD_TO_UNIT_ASSIGNMENT_NAMESPACE), cardId: PlayerCard.HEAL, unitId: 'unit1' },
    { id: getUniqueId(CARD_TO_UNIT_ASSIGNMENT_NAMESPACE), cardId: PlayerCard.MANEUVER, unitId: 'unit1' },
    { id: getUniqueId(CARD_TO_UNIT_ASSIGNMENT_NAMESPACE), cardId: PlayerCard.TELEPORT, unitId: 'unit1' },
    { id: getUniqueId(CARD_TO_UNIT_ASSIGNMENT_NAMESPACE), cardId: PlayerCard.FIREBALL, unitId: 'unit1' },
    { id: getUniqueId(CARD_TO_UNIT_ASSIGNMENT_NAMESPACE), cardId: PlayerCard.MANEUVER, unitId: 'unit2' },
    { id: getUniqueId(CARD_TO_UNIT_ASSIGNMENT_NAMESPACE), cardId: PlayerCard.ARROW, unitId: 'unit2' },
    { id: getUniqueId(CARD_TO_UNIT_ASSIGNMENT_NAMESPACE), cardId: PlayerCard.MANEUVER, unitId: 'unit3' },
    { id: getUniqueId(CARD_TO_UNIT_ASSIGNMENT_NAMESPACE), cardId: PlayerCard.AXE, unitId: 'unit3' },
  ]),
}

export function battleReducer(state: BattleState = INITIAL_STATE, action: BattleActionTypes): BattleState {
  switch (action.type) {
    case BattleTypeKeys.ASSIGN_DICE_RESPONSE:
      const { assignmentId, cardId } = action
      return {
        ...state,
        diceToCardAssignments: updateIdMap(state.diceToCardAssignments, assignmentId, oldAssignment => ({
          ...oldAssignment,
          cardId,
        })),
      }
    case BattleTypeKeys.ROLL_DICES_RESPONSE: {
      const { unitId, result } = action
      const responseUnit = state.units[unitId]
      const newRolls = responseUnit.rolls - 1
      const newState = {
        ...state,
        diceToCardAssignments: mapIdMapValues(state.diceToCardAssignments, (assignment) => {
          if (result[assignment.id]) {
            return {
              ...assignment,
              rollResult: result[assignment.id],
            }
          }
          return assignment
        }),
        units: updateIdMap(state.units, unitId, oldUnit => ({
          ...oldUnit,
          rolls: newRolls,
          phase: oldUnit.phase === RollingPhases.ROLLING ? RollingPhases.REROLLING : oldUnit.phase,
          query: newRolls === 0 ? [
            {
              select: PlayerQuerySelectTarget.DICE,
              where: [{
                type: WhereClauseType.MATCH_ALL,
                prop: 'canBeAssignedToCard',
                operator: WhereClauseOperator.EQUAL,
                value: true,
              }],
            },
            {
              select: PlayerQuerySelectTarget.DICE_ACTION,
              where: [{
                type: WhereClauseType.MATCH_ALL,
                prop: 'id',
                operator: WhereClauseOperator.EQUAL,
                value: 'keep',
              }],
            },
          ] : oldUnit.phase === RollingPhases.ROLLING ? [
            {
              select: PlayerQuerySelectTarget.DICE,
              where: [{
                type: WhereClauseType.MATCH_ALL,
                prop: 'canBeAssignedToCard',
                operator: WhereClauseOperator.EQUAL,
                value: true,
              }],
            },
            {
              select: PlayerQuerySelectTarget.DICE_ACTION,
              where: [{
                type: WhereClauseType.MATCH_ALL,
                prop: 'id',
                operator: WhereClauseOperator.EQUAL,
                value: 'roll',
              }],
            },
            {
              select: PlayerQuerySelectTarget.DICE_ACTION,
              where: [{
                type: WhereClauseType.MATCH_ALL,
                prop: 'id',
                operator: WhereClauseOperator.EQUAL,
                value: 'keep',
              }],
            },
          ] : oldUnit.query,
        })),
      }
      const allPlayersPlaying = Object.keys(newState.units).every(unitId => newState.units[unitId].phase === RollingPhases.WAITING_FOR_OTHERS)
      if (allPlayersPlaying) {
        return {
          ...newState,
          units: mapUnitsToAllPlayingCards(newState.units),
        }
      }
      return newState
    }
    case BattleTypeKeys.KEEP_DICES_RESPONSE: {
      const { unitId } = action
      const newState = {
        ...state,
        units: updateIdMap(state.units, unitId, oldUnit => ({
          ...oldUnit,
          phase: RollingPhases.WAITING_FOR_OTHERS,
          query: [
            { select: PlayerQuerySelectTarget.NONE },
          ],
          rolls: 0,
        })),
      }
      if (everyIdMapValue(newState.units, ({ phase }) => phase === RollingPhases.WAITING_FOR_OTHERS)) {
        return {
          ...newState,
          units: mapUnitsToAllPlayingCards(newState.units),
        }
      }
      return newState
    }
    case BattleTypeKeys.SET_UNIT_PHASE_RESPONSE: {
      const { unitId, phase } = action
      return {
        ...state,
        units: updateIdMap(state.units, unitId,
          oldUnit => ({ ...oldUnit, phase })),
      }
    }
    case BattleTypeKeys.SET_UNIT_QUERY_RESPONSE: {
      const { unitId, query } = action
      return {
        ...state,
        units: updateIdMap(state.units, unitId,
          oldUnit => ({ ...oldUnit, query })),
      }
    }
    case BattleTypeKeys.ACCEPT_ASSIGNMENT:
      return {
        ...state,
      }
    case BattleTypeKeys.PLAYER_QUERY_RESPONSE: {
      const { unitId, query } = action
      return {
        ...state,
        units: updateIdMap(state.units, unitId, oldUnit => ({ ...oldUnit, query })),
      }
    }
    case BattleTypeKeys.DAMAGE_UNIT_RESPONSE: {
      const { unitId, dmgAmount: damage } = action
      return {
        ...state,
        units: updateIdMap(state.units, unitId, oldUnit => ({ ...oldUnit, damage })),
      }
    }
    case BattleTypeKeys.KILL_UNIT_RESPONSE: {
      const { unitId } = action
      // noinspection JSUnusedLocalSymbols
      const { [unitId]: omit, ...rest } = state.units
      return {
        ...state,
        units: rest,
        cardToUnitAssignments: filterIdMap(state.cardToUnitAssignments, a => a.unitId !== unitId),
        diceToCardAssignments: filterIdMap(state.diceToCardAssignments, a => a.unitId !== unitId),
      }
    }
    case BattleTypeKeys.MOVE_UNIT_TO_GROUP_RESPONSE: {
      const { groupId, unitId } = action
      return {
        ...state,
        units: updateIdMap(state.units, unitId, oldUnit => ({ ...oldUnit, groupId })),
      }
    }
    case BattleTypeKeys.CARD_PLAY_RESPONSE: {
      const { phase, unitId, select } = action
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
      const { groupId, dtcaId, unitId } = action
      return {
        ...state,
        units: updateIdMap(mapUnitsToAllPlayingCards(state.units), unitId, oldUnit => ({ ...oldUnit, groupId })),
        diceToCardAssignments: updateIdMap(state.diceToCardAssignments, dtcaId, oldTtca => ({
          ...oldTtca,
          cardId: PlayerCard.USED,
        })),
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
