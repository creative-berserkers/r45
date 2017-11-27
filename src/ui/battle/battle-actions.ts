import {Action} from 'redux';
import {DiceState, GroupState, PlayerQuery, UnitState} from "./battle-reducer";

export enum BattleTypeKeys {
    PLAYER_ID_ASSIGNED = 'PLAYER_ID_ASSIGNED',
    ASSIGN_DICE_REQUEST = 'ASSIGN_DICE_REQUEST',
    ASSIGN_DICE_RESPONSE = 'ASSIGN_DICE_RESPONSE',
    ROLL_DICES_REQUEST = 'ROLL_DICES_REQUEST',
    ROLL_DICES_RESPONSE = 'ROLL_DICES_RESPONSE',
    KEEP_DICES_REQUEST = 'KEEP_DICES_REQUEST',
    KEEP_DICES_RESPONSE = 'KEEP_DICES_RESPONSE',
    ACCEPT_ASSIGNMENT = 'ACCEPT_ASSIGNMENT',
    CARD_PLAY_REQUEST = 'CARD_PLAY_REQUEST',
    PLAYER_QUERY_REQUEST = 'PLAYER_QUERY_REQUEST',
    PLAYER_QUERY_RESPONSE = 'PLAYER_QUERY_RESPONSE',
    UNIT_SELECT_REQUEST = 'UNIT_SELECT_REQUEST',
    DIRECT_DAMAGE_RESPONSE = 'DIRECT_DAMAGE_RESPONSE',
    OTHER_ACTION = '__any_other_action_type__'
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
    unitId: string
    diceId: string
    cardId: string
}

export interface RollDicesResponseAction extends Action {
    type: BattleTypeKeys.ROLL_DICES_RESPONSE
    unitId: string
    dices: DiceState[]
}

export interface RollDicesRequestAction extends Action {
    type: BattleTypeKeys.ROLL_DICES_REQUEST
    unitId: string
}

export interface KeepDicesRequestAction extends Action {
    type: BattleTypeKeys.KEEP_DICES_REQUEST
    unitId: string
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
    unitId: string
    cardId: string
}

export interface PlayerQueryRequestAction extends Action {
    type: BattleTypeKeys.PLAYER_QUERY_REQUEST,
    query: PlayerQuery
}

export interface PlayerQueryResponseAction extends Action {
    type: BattleTypeKeys.PLAYER_QUERY_RESPONSE,
    selection: UnitState | GroupState
}

export interface UnitSelectRequestAction extends Action {
    type: BattleTypeKeys.UNIT_SELECT_REQUEST
    unitId: string
    targetUnitId: string
}

export interface DirectDamageResponseAction extends Action {
    type: BattleTypeKeys.DIRECT_DAMAGE_RESPONSE,
    targetUnitId: string
    dmgAmount: number
}

export interface OtherAction extends Action {
    type: BattleTypeKeys.OTHER_ACTION
}

export function playerIdAssigned(playerId: string): PlayerIdAssignedAction {
    return {
        type: BattleTypeKeys.PLAYER_ID_ASSIGNED,
        playerId
    }
}

export function assignDiceRequest(unitId: string, diceId: string): AssignDiceRequestAction {
    return {
        type: BattleTypeKeys.ASSIGN_DICE_REQUEST,
        diceId,
        unitId
    }
}

export function assignDiceResponse(unitId: string, diceId: string, cardId: string): AssignDiceResponseAction {
    return {
        type: BattleTypeKeys.ASSIGN_DICE_RESPONSE,
        diceId,
        cardId,
        unitId
    }
}

export function rollDicesRequest(unitId: string): RollDicesRequestAction {
    return {
        type: BattleTypeKeys.ROLL_DICES_REQUEST,
        unitId
    }
}

export function rollDicesResponse(unitId: string, dices: DiceState[]): RollDicesResponseAction {
    return {
        type: BattleTypeKeys.ROLL_DICES_RESPONSE,
        unitId,
        dices
    }
}

export function keepDicesRequest(unitId:string): KeepDicesRequestAction {
    return {
        type: BattleTypeKeys.KEEP_DICES_REQUEST,
        unitId
    }
}

export function keepDicesResponse(unitId:string): KeepDicesResponseAction {
    return {
        type: BattleTypeKeys.KEEP_DICES_RESPONSE,
        unitId
    }
}

export function acceptAssignment(): AcceptAssignmentAction {
    return {
        type: BattleTypeKeys.ACCEPT_ASSIGNMENT
    }
}

export function cardPlayRequest(unitId:string, cardId: string): CardPlayRequestAction {
    return {
        type: BattleTypeKeys.CARD_PLAY_REQUEST,
        unitId,
        cardId
    }
}

export function playerQueryRequest(query: PlayerQuery): PlayerQueryRequestAction {
    return {
        type: BattleTypeKeys.PLAYER_QUERY_REQUEST,
        query
    }
}

export function playerQueryResponse(selection: UnitState | GroupState): PlayerQueryResponseAction {
    return {
        type: BattleTypeKeys.PLAYER_QUERY_RESPONSE,
        selection
    }
}

export function unitSelectRequest(unitId:string, targetUnitId:string): UnitSelectRequestAction {
    return {
        type: BattleTypeKeys.UNIT_SELECT_REQUEST,
        unitId,
        targetUnitId
    }
}

export function directDamageResponse(targetUnitId:string, dmgAmount:number): DirectDamageResponseAction {
    return {
        type: BattleTypeKeys.DIRECT_DAMAGE_RESPONSE,
        targetUnitId,
        dmgAmount
    }
}

export type BattleActionTypes = AssignDiceRequestAction
    | RollDicesResponseAction
    | KeepDicesResponseAction
    | AcceptAssignmentAction
    | PlayerQueryRequestAction
    | AssignDiceResponseAction
    | DirectDamageResponseAction
    | OtherAction


export enum BattleViewTypeKeys {
    SET_ACTIVE_UNIT_ID = 'SET_ACTIVE_UNIT_ID',
    OTHER_ACTION = '__any_other_action_type__'
}

export interface SetActiveUnitId extends Action {
    type: BattleViewTypeKeys.SET_ACTIVE_UNIT_ID
    unitId: string
}

export function setActiveUnitId(unitId: string): SetActiveUnitId {
    return {
        type: BattleViewTypeKeys.SET_ACTIVE_UNIT_ID,
        unitId
    }
}

export type BattleViewActionTypes = SetActiveUnitId