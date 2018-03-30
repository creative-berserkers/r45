import { Action } from 'redux'
import {
  BattlePhases, DiceRollState, PlayCardPhases, PlayerCard, PlayerQuery, PlayerQuerySelectTarget,
} from './battle-reducer'
import { createAction } from '../../utils/create-action'
import { IdMap } from './battle-utils'

export enum BattleTypeKeys {
  START_GAME_REQUEST_ACTION = 'START_GAME_REQUEST_ACTION',
  PLAYER_ID_ASSIGNED = 'PLAYER_ID_ASSIGNED',
  ASSIGN_DICE_REQUEST = 'ASSIGN_DICE_REQUEST',
  ASSIGN_DICE_RESPONSE = 'ASSIGN_DICE_RESPONSE',
  ROLL_DICES_REQUEST = 'ROLL_DICES_REQUEST',
  KEEP_DICES_REQUEST = 'KEEP_DICES_REQUEST',
  SET_UNIT_DICE_ROLLS = 'SET_UNIT_DICE_ROLLS',
  SET_UNIT_PHASE_RESPONSE = 'SET_UNIT_PHASE_RESPONSE',
  SET_UNIT_QUERY_RESPONSE = 'SET_UNIT_QUERY_RESPONSE',
  SET_UNIT_ROLLS_RESPONSE = 'SET_UNIT_ROLLS_RESPONSE',
  KEEP_DICES_RESPONSE = 'KEEP_DICES_RESPONSE',
  CARD_PLAY_REQUEST = 'CARD_PLAY_REQUEST',
  CARD_PLAY_RESPONSE = 'CARD_PLAY_RESPONSE',
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

export interface RequestActionMeta {
  type: 'request'
  unitId: string
}

export interface ResponseActionMeta {
  type: 'response'
  unitId: string
}

export interface RequestAction<T, P = null, M extends RequestActionMeta = RequestActionMeta> extends Action {
  type: T,
  payload: P,
  meta: M
}

export interface ResponseAction<T, P = null, M extends ResponseActionMeta = ResponseActionMeta> extends Action {
  type: T
  payload: P
  meta: M
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

export interface RollDicesResult {
  [key: string]: number
}

export interface CardPlayPayload {
  phase: PlayCardPhases
  playerCard: PlayerCard
  select: PlayerQuerySelectTarget
}

export interface TeleportPlayPayload {
  dtcaId: string
  groupId: string
}

export interface AssignDicePayload {
  diceRollId: string
  cardId: string
}

export type StartGameRequestAction =  RequestAction<BattleTypeKeys.START_GAME_REQUEST_ACTION>
export type RollDicesRequestAction =  RequestAction<BattleTypeKeys.ROLL_DICES_REQUEST>
export type KeepDicesRequestAction = RequestAction<BattleTypeKeys.KEEP_DICES_REQUEST>
export type CardPlayRequestAction = RequestAction<BattleTypeKeys.CARD_PLAY_REQUEST, PlayerCard>
export type UnitSelectRequestAction = RequestAction<BattleTypeKeys.UNIT_SELECT_REQUEST, string>
export type DiceSelectRequestAction = RequestAction<BattleTypeKeys.DICE_SELECT_REQUEST, string>
export type GroupSelectRequestAction = RequestAction<BattleTypeKeys.GROUP_SELECT_REQUEST, string>

export type SetUnitDiceRollsResponseAction = ResponseAction<BattleTypeKeys.SET_UNIT_DICE_ROLLS, IdMap<DiceRollState>>
export type SetUnitPhaseResponseAction = ResponseAction<BattleTypeKeys.SET_UNIT_PHASE_RESPONSE, BattlePhases>
export type SetUnitQueryResponseAction = ResponseAction<BattleTypeKeys.SET_UNIT_QUERY_RESPONSE, PlayerQuery[]>
export type SetUnitRollsResponseAction = ResponseAction<BattleTypeKeys.SET_UNIT_ROLLS_RESPONSE, number>
export type SetUnitGroupResponseAction = ResponseAction<BattleTypeKeys.SET_UNIT_GROUP_RESPONSE, string>
export type KeepDicesResponseAction = ResponseAction<BattleTypeKeys.KEEP_DICES_RESPONSE>
export type CardPlayResponseAction = ResponseAction<BattleTypeKeys.CARD_PLAY_RESPONSE, CardPlayPayload>
export type DamageUnitResponseAction = ResponseAction<BattleTypeKeys.DAMAGE_UNIT_RESPONSE, number>
export type KillUnitResponseAction = ResponseAction<BattleTypeKeys.KILL_UNIT_RESPONSE>
export type MoveUnitToGroupResponseAction = ResponseAction<BattleTypeKeys.MOVE_UNIT_TO_GROUP_RESPONSE, string>
export type TeleportPlayResponseAction = ResponseAction<BattleTypeKeys.TELEPORT_PLAY_RESPONSE, TeleportPlayPayload>
export type AssignDiceResponseAction = ResponseAction<BattleTypeKeys.ASSIGN_DICE_RESPONSE, AssignDicePayload>

export interface OtherAction extends Action {
  type: BattleTypeKeys.OTHER_ACTION
}

export const responseMetaCreator = (unitId:string) => ({ unitId, type: 'response' })
export const requestMetaCreator = (unitId:string) => ({ unitId, type: 'request' })

export function playerIdAssigned(playerId: string): PlayerIdAssignedAction {
  return {
    playerId,
    type: BattleTypeKeys.PLAYER_ID_ASSIGNED,
  }
}

export const startGameRequest = createAction(BattleTypeKeys.START_GAME_REQUEST_ACTION, () => null, requestMetaCreator)
export const rollDicesRequest = createAction(BattleTypeKeys.ROLL_DICES_REQUEST, () => null, requestMetaCreator)
export const keepDicesRequest = createAction(BattleTypeKeys.KEEP_DICES_REQUEST, () => null, requestMetaCreator)
export const cardPlayRequest = createAction(BattleTypeKeys.CARD_PLAY_REQUEST, (unitId:string,cardId:string) => cardId, requestMetaCreator)
export const unitSelectRequest = createAction(BattleTypeKeys.UNIT_SELECT_REQUEST, () => null, requestMetaCreator)
export const diceSelectRequest = createAction(BattleTypeKeys.DICE_SELECT_REQUEST, (unitId:string,diceId:string) => diceId, requestMetaCreator)
export const groupSelectRequest = createAction(BattleTypeKeys.GROUP_SELECT_REQUEST, (unitId:string, targetGroupId:string) => targetGroupId, requestMetaCreator)

export const assignDiceResponse = createAction(BattleTypeKeys.ASSIGN_DICE_RESPONSE, (unitId:string, cardId:string, diceId:string) => ({ cardId, diceId }), responseMetaCreator)
export const keepDicesResponse = createAction(BattleTypeKeys.KEEP_DICES_RESPONSE, () => null, responseMetaCreator)
export const cardPlayResponse = createAction(BattleTypeKeys.CARD_PLAY_RESPONSE,
  (unitId: string, playerCard: PlayerCard, phase: PlayCardPhases, select: PlayerQuerySelectTarget):CardPlayPayload => ({
    playerCard,
    phase,
    select,
  }), responseMetaCreator)
export const damageUnitResponse = createAction(BattleTypeKeys.DAMAGE_UNIT_RESPONSE, (unitId: string, dmgAmount: number) => dmgAmount, responseMetaCreator)
export const killUnitResponse = createAction(BattleTypeKeys.KILL_UNIT_RESPONSE, () => null, responseMetaCreator)
export const moveUnitToGroupResponse = createAction(BattleTypeKeys.MOVE_UNIT_TO_GROUP_RESPONSE, (unitId: string, groupId: string) => groupId, responseMetaCreator)
export const setUnitDiceRollsResponse = createAction(BattleTypeKeys.SET_UNIT_DICE_ROLLS, (unitId: string, rolls: IdMap<DiceRollState>) => rolls, responseMetaCreator)
export const setUnitPhaseResponse = createAction(BattleTypeKeys.SET_UNIT_PHASE_RESPONSE, (unitId: string, phase: BattlePhases) => phase, responseMetaCreator)
export const setUnitQueryResponse = createAction(BattleTypeKeys.SET_UNIT_QUERY_RESPONSE,(unitId: string, query: PlayerQuery[]) => query, responseMetaCreator)
export const setUnitRollsResponse = createAction(BattleTypeKeys.SET_UNIT_ROLLS_RESPONSE,(unitId: string, rolls: number) => rolls, responseMetaCreator)
export const setUnitGroupResponse = createAction(BattleTypeKeys.SET_UNIT_GROUP_RESPONSE, (unitId: string, groupId: string) => groupId, responseMetaCreator)


export type BattleActionRequestTypes = RollDicesRequestAction
  | DiceSelectRequestAction
  | KeepDicesRequestAction
  | CardPlayRequestAction
  | GroupSelectRequestAction
  | UnitSelectRequestAction

export type BattleActionTypes = AssignDiceRequestAction
  | KeepDicesResponseAction
  | SetUnitDiceRollsResponseAction
  | SetUnitPhaseResponseAction
  | SetUnitQueryResponseAction
  | SetUnitRollsResponseAction
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
