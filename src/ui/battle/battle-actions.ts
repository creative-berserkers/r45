import { Action } from 'redux'
import {
  BattlePhases, PlayCardPhases, PlayerCard, PlayerQuery, PlayerQuerySelectTarget,
} from './battle-reducer'

export enum BattleTypeKeys {
  REQUEST_ACTION = 'REQUEST_ACTION',
  PLAYER_ID_ASSIGNED = 'PLAYER_ID_ASSIGNED',
  ASSIGN_DICE_REQUEST = 'ASSIGN_DICE_REQUEST',
  ASSIGN_DICE_RESPONSE = 'ASSIGN_DICE_RESPONSE',
  ROLL_DICES_REQUEST = 'ROLL_DICES_REQUEST',
  ROLL_DICES_RESPONSE = 'ROLL_DICES_RESPONSE',
  KEEP_DICES_REQUEST = 'KEEP_DICES_REQUEST',
  SET_UNIT_PHASE_RESPONSE = 'SET_UNIT_PHASE_RESPONSE',
  SET_UNIT_QUERY_RESPONSE = 'SET_UNIT_QUERY_RESPONSE',
  KEEP_DICES_RESPONSE = 'KEEP_DICES_RESPONSE',
  ACCEPT_ASSIGNMENT = 'ACCEPT_ASSIGNMENT',
  CARD_PLAY_REQUEST = 'CARD_PLAY_REQUEST',
  CARD_PLAY_RESPONSE = 'CARD_PLAY_RESPONSE',
  PLAYER_QUERY_RESPONSE = 'PLAYER_QUERY_RESPONSE',
  UNIT_SELECT_REQUEST = 'UNIT_SELECT_REQUEST',
  DICE_SELECT_REQUEST = 'DICE_SELECT_REQUEST',
  GROUP_SELECT_REQUEST = 'GROUP_SELECT_REQUEST',
  DAMAGE_UNIT_RESPONSE = 'DAMAGE_UNIT_RESPONSE',
  KILL_UNIT_RESPONSE = 'KILL_UNIT_RESPONSE',
  MOVE_UNIT_TO_GROUP_RESPONSE = 'MOVE_UNIT_TO_GROUP_RESPONSE',
  TELEPORT_PLAY_RESPONSE = 'TELEPORT_PLAY_RESPONSE',
  SET_UNIT_GROUP_RESPONSE = 'SET_UNIT_GROUP_RESPONSE',
  OTHER_ACTION = '__any_other_action_type__',
}

export interface RequestActionWrapper<T extends Action> extends Action {
  type: BattleTypeKeys.REQUEST_ACTION
  action: T
  unitId: string
}

export interface ResponseAction<T> extends Action {
  type: T,
  unitId: string
}

export interface PlayerIdAssignedAction extends Action {
  type: BattleTypeKeys.PLAYER_ID_ASSIGNED,
  playerId: string
}

export interface AssignDiceRequestAction extends Action {
  type: BattleTypeKeys.ASSIGN_DICE_REQUEST,
  unitId: string
  diceId: string
}

export interface AssignDiceResponseAction extends Action {
  type: BattleTypeKeys.ASSIGN_DICE_RESPONSE,
  assignmentId: string
  cardId: PlayerCard
}

export interface RollDicesResult {
  [key: string]: number
}

export interface RollDicesResponseAction extends Action {
  type: BattleTypeKeys.ROLL_DICES_RESPONSE
  unitId: string
  result: RollDicesResult
}

export interface RollDicesRequestAction extends Action {
  type: BattleTypeKeys.ROLL_DICES_REQUEST
}

export interface SetUnitPhaseResponseAction extends ResponseAction<BattleTypeKeys.SET_UNIT_PHASE_RESPONSE> {
  phase: BattlePhases
}

export interface SetUnitQueryResponseAction extends ResponseAction<BattleTypeKeys.SET_UNIT_QUERY_RESPONSE> {
  query: PlayerQuery[]
}

export interface SetUnitGroupResponseAction extends ResponseAction<BattleTypeKeys.SET_UNIT_GROUP_RESPONSE> {
  groupId: string
}

export interface KeepDicesRequestAction extends Action {
  type: BattleTypeKeys.KEEP_DICES_REQUEST
}

export interface KeepDicesResponseAction extends Action {
  type: BattleTypeKeys.KEEP_DICES_RESPONSE,
  unitId: string
}

export interface AcceptAssignmentAction extends Action {
  type: BattleTypeKeys.ACCEPT_ASSIGNMENT
}

export interface CardPlayRequestAction extends Action {
  type: BattleTypeKeys.CARD_PLAY_REQUEST
  cardId: PlayerCard
}

export interface PlayerQueryResponseAction extends Action {
  type: BattleTypeKeys.PLAYER_QUERY_RESPONSE
  query: PlayerQuery[]
  unitId: string
}

export interface UnitSelectRequestAction extends Action {
  type: BattleTypeKeys.UNIT_SELECT_REQUEST
  targetUnitId: string
}

export interface DiceSelectRequestAction extends Action {
  type: BattleTypeKeys.DICE_SELECT_REQUEST
  diceId: string
}

export interface GroupSelectRequestAction extends Action {
  type: BattleTypeKeys.GROUP_SELECT_REQUEST
  targetGroupId: string
}

export interface CardPlayResponseAction extends ResponseAction<BattleTypeKeys.CARD_PLAY_RESPONSE> {
  phase: PlayCardPhases
  playerCard: PlayerCard
  select: PlayerQuerySelectTarget
}

export interface DamageUnitResponseAction extends ResponseAction<BattleTypeKeys.DAMAGE_UNIT_RESPONSE> {
  dmgAmount: number
}

export interface KillUnitResponseAction extends ResponseAction<BattleTypeKeys.KILL_UNIT_RESPONSE> {
}

export interface MoveUnitToGroupResponseAction extends ResponseAction<BattleTypeKeys.MOVE_UNIT_TO_GROUP_RESPONSE> {
  groupId: string
}

export interface TeleportPlayResponseAction extends ResponseAction<BattleTypeKeys.TELEPORT_PLAY_RESPONSE> {
  dtcaId: string
  groupId: string
}

export interface OtherAction extends Action {
  type: BattleTypeKeys.OTHER_ACTION
}

export function request<T extends Action>(unitId: string, action: T): RequestActionWrapper<T> {
  return {
    action,
    unitId,
    type: BattleTypeKeys.REQUEST_ACTION,
  }
}

export function playerIdAssigned(playerId: string): PlayerIdAssignedAction {
  return {
    playerId,
    type: BattleTypeKeys.PLAYER_ID_ASSIGNED,
  }
}

export function assignDiceResponse(assignmentId: string, cardId: PlayerCard): AssignDiceResponseAction {
  return {
    assignmentId,
    cardId,
    type: BattleTypeKeys.ASSIGN_DICE_RESPONSE,
  }
}

export function rollDicesRequest(): RollDicesRequestAction {
  return {
    type: BattleTypeKeys.ROLL_DICES_REQUEST,
  }
}

export function rollDicesResponse(unitId: string, result: RollDicesResult): RollDicesResponseAction {
  return {
    unitId,
    result,
    type: BattleTypeKeys.ROLL_DICES_RESPONSE,
  }
}

export function keepDicesRequest(): KeepDicesRequestAction {
  return {
    type: BattleTypeKeys.KEEP_DICES_REQUEST,
  }
}

export function keepDicesResponse(unitId: string): KeepDicesResponseAction {
  return {
    unitId,
    type: BattleTypeKeys.KEEP_DICES_RESPONSE,
  }
}

export function acceptAssignment(): AcceptAssignmentAction {
  return {
    type: BattleTypeKeys.ACCEPT_ASSIGNMENT,
  }
}

export function cardPlayRequest(cardId: PlayerCard): CardPlayRequestAction {
  return {
    cardId,
    type: BattleTypeKeys.CARD_PLAY_REQUEST,
  }
}

export function unitSelectRequest(targetUnitId: string): UnitSelectRequestAction {
  return {
    targetUnitId,
    type: BattleTypeKeys.UNIT_SELECT_REQUEST,
  }
}

export function diceSelectRequest(diceId: string): DiceSelectRequestAction {
  return {
    diceId,
    type: BattleTypeKeys.DICE_SELECT_REQUEST,
  }
}

export function groupSelectRequest(targetGroupId: string): GroupSelectRequestAction {
  return {
    targetGroupId,
    type: BattleTypeKeys.GROUP_SELECT_REQUEST,
  }
}

export function cardPlayResponse(unitId: string, playerCard: PlayerCard, phase: PlayCardPhases, select: PlayerQuerySelectTarget): CardPlayResponseAction {
  return {
    unitId,
    playerCard,
    phase,
    select,
    type: BattleTypeKeys.CARD_PLAY_RESPONSE,
  }
}

export function damageUnitResponse(unitId: string, dmgAmount: number): DamageUnitResponseAction {
  return {
    unitId,
    dmgAmount,
    type: BattleTypeKeys.DAMAGE_UNIT_RESPONSE,
  }
}

export function killUnitResponse(unitId: string): KillUnitResponseAction {
  return {
    unitId,
    type: BattleTypeKeys.KILL_UNIT_RESPONSE,
  }
}

export function moveUnitToGroupResponse(unitId: string, groupId: string): MoveUnitToGroupResponseAction {
  return {
    unitId,
    groupId,
    type: BattleTypeKeys.MOVE_UNIT_TO_GROUP_RESPONSE,
  }
}

export function teleportPlayResponse(unitId: string, groupId: string, dtcaId: string): TeleportPlayResponseAction {
  return {
    unitId,
    dtcaId,
    groupId,
    type: BattleTypeKeys.TELEPORT_PLAY_RESPONSE,
  }
}

export function setUnitPhaseResponse(unitId: string, phase: BattlePhases): SetUnitPhaseResponseAction {
  return {
    unitId,
    phase,
    type: BattleTypeKeys.SET_UNIT_PHASE_RESPONSE,
  }
}

export function setUnitQueryResponse(unitId: string, query: PlayerQuery[]): SetUnitQueryResponseAction {
  return {
    unitId,
    query,
    type: BattleTypeKeys.SET_UNIT_QUERY_RESPONSE,
  }
}

export function setUnitGroupResponse(unitId: string, groupId: string): SetUnitGroupResponseAction {
  return {
    unitId,
    groupId,
    type: BattleTypeKeys.SET_UNIT_GROUP_RESPONSE,
  }
}


export type BattleActionRequestTypes = RollDicesRequestAction
  | DiceSelectRequestAction
  | KeepDicesRequestAction
  | CardPlayRequestAction
  | GroupSelectRequestAction
  | UnitSelectRequestAction

export type BattleActionTypes = AssignDiceRequestAction
  | RollDicesResponseAction
  | KeepDicesResponseAction
  | SetUnitPhaseResponseAction
  | SetUnitQueryResponseAction
  | AcceptAssignmentAction
  | PlayerQueryResponseAction
  | AssignDiceResponseAction
  | DamageUnitResponseAction
  | KillUnitResponseAction
  | MoveUnitToGroupResponseAction
  | CardPlayResponseAction
  | TeleportPlayResponseAction
  | OtherAction


export enum BattleViewTypeKeys {
  // noinspection JSUnusedGlobalSymbols
  SET_ACTIVE_UNIT_ID = 'SET_ACTIVE_UNIT_ID',
  OTHER_ACTION = '__any_other_action_type__',
}

export interface SetActiveUnitId extends Action {
  type: BattleViewTypeKeys.SET_ACTIVE_UNIT_ID
  unitId: string
}

export function setActiveUnitId(unitId: string): SetActiveUnitId {
  return {
    unitId,
    type: BattleViewTypeKeys.SET_ACTIVE_UNIT_ID,
  }
}

export type BattleViewActionTypes = SetActiveUnitId
