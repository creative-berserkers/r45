import {Action} from 'redux';
import {BattlePhases, DiceState, GroupState, PlayerQuery, UnitState} from './battle-reducer';

export enum BattleTypeKeys {
    REQUEST_ACTION = 'REQUEST_ACTION',
    PLAYER_ID_ASSIGNED = 'PLAYER_ID_ASSIGNED',
    ASSIGN_DICE_REQUEST = 'ASSIGN_DICE_REQUEST',
    ASSIGN_DICE_RESPONSE = 'ASSIGN_DICE_RESPONSE',
    ROLL_DICES_REQUEST = 'ROLL_DICES_REQUEST',
    ROLL_DICES_RESPONSE = 'ROLL_DICES_RESPONSE',
    KEEP_DICES_REQUEST = 'KEEP_DICES_REQUEST',
    SET_UNIT_PHASE_RESPONSE = 'SET_UNIT_PHASE_RESPONSE',
    KEEP_DICES_RESPONSE = 'KEEP_DICES_RESPONSE',
    ACCEPT_ASSIGNMENT = 'ACCEPT_ASSIGNMENT',
    CARD_PLAY_REQUEST = 'CARD_PLAY_REQUEST',
    PLAYER_QUERY_RESPONSE = 'PLAYER_QUERY_RESPONSE',
    UNIT_SELECT_REQUEST = 'UNIT_SELECT_REQUEST',
    DICE_SELECT_REQUEST = 'DICE_SELECT_REQUEST',
    GROUP_SELECT_REQUEST = 'GROUP_SELECT_REQUEST',
    DAMAGE_UNIT_RESPONSE = 'DAMAGE_UNIT_RESPONSE',
    KILL_UNIT_RESPONSE = 'KILL_UNIT_RESPONSE',
    MOVE_UNIT_TO_GROUP_RESPONSE = 'MOVE_UNIT_TO_GROUP_RESPONSE',
    OTHER_ACTION = '__any_other_action_type__'
}

export interface RequestAction<T extends Action> extends Action {
    type: BattleTypeKeys.REQUEST_ACTION
    action: T
    unitId:string
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
}

export interface SetUnitPhaseResponseAction extends Action {
    type: BattleTypeKeys.SET_UNIT_PHASE_RESPONSE
    unitId: string
    phase:BattlePhases
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
    unitId: string
    cardId: string
}

export interface PlayerQueryResponseAction extends Action {
    type: BattleTypeKeys.PLAYER_QUERY_RESPONSE
    query: PlayerQuery[]
    unitId: string
}

export interface UnitSelectRequestAction extends Action {
    type: BattleTypeKeys.UNIT_SELECT_REQUEST
    unitId: string
    targetUnitId: string
}

export interface DiceSelectRequestAction extends Action {
    type: BattleTypeKeys.DICE_SELECT_REQUEST
    unitId: string
    diceId: string
}

export interface GroupSelectRequestAction extends Action {
    type: BattleTypeKeys.GROUP_SELECT_REQUEST
    unitId: string
    targetGroupId: string
}

export interface DamageUnitResponseAction extends Action {
    type: BattleTypeKeys.DAMAGE_UNIT_RESPONSE,
    unitId: string
    dmgAmount: number
}

export interface KillUnitResponseAction extends Action {
    type: BattleTypeKeys.KILL_UNIT_RESPONSE,
    unitId: string
}

export interface MoveUnitToGroupResponseAction extends Action {
    type: BattleTypeKeys.MOVE_UNIT_TO_GROUP_RESPONSE,
    unitId: string
    groupId: string
}

export interface OtherAction extends Action {
    type: BattleTypeKeys.OTHER_ACTION
}

export function request<T extends Action>(unitId:string, action: T): RequestAction<T> {
    return {
        type: BattleTypeKeys.REQUEST_ACTION,
        action,
        unitId
    }
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

export function rollDicesRequest(): RollDicesRequestAction {
    return {
        type: BattleTypeKeys.ROLL_DICES_REQUEST,
    }
}

export function rollDicesResponse(unitId: string, dices: DiceState[]): RollDicesResponseAction {
    return {
        type: BattleTypeKeys.ROLL_DICES_RESPONSE,
        unitId,
        dices
    }
}

export function setUnitPhaseResponse(unitId: string,phase:BattlePhases): SetUnitPhaseResponseAction{
    return {
        type: BattleTypeKeys.SET_UNIT_PHASE_RESPONSE,
        unitId,
        phase
    }
}

export function keepDicesRequest(): KeepDicesRequestAction {
    return {
        type: BattleTypeKeys.KEEP_DICES_REQUEST
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

export function playerQueryResponse(unitId:string, query: PlayerQuery[]): PlayerQueryResponseAction {
    return {
        type: BattleTypeKeys.PLAYER_QUERY_RESPONSE,
        unitId,
        query
    }
}

export function unitSelectRequest(unitId:string, targetUnitId:string): UnitSelectRequestAction {
    return {
        type: BattleTypeKeys.UNIT_SELECT_REQUEST,
        unitId,
        targetUnitId
    }
}

export function diceSelectRequest(unitId:string, diceId:string): DiceSelectRequestAction {
    return {
        type: BattleTypeKeys.DICE_SELECT_REQUEST,
        unitId,
        diceId
    }
}

export function groupSelectRequest(unitId:string, targetGroupId:string): GroupSelectRequestAction {
    return {
        type: BattleTypeKeys.GROUP_SELECT_REQUEST,
        unitId,
        targetGroupId
    }
}

export function damageUnitResponse(unitId:string, dmgAmount:number): DamageUnitResponseAction {
    return {
        type: BattleTypeKeys.DAMAGE_UNIT_RESPONSE,
        unitId,
        dmgAmount
    }
}

export function killUnitResponse(unitId:string): KillUnitResponseAction {
    return {
        type: BattleTypeKeys.KILL_UNIT_RESPONSE,
        unitId
    }
}

export function moveUnitToGroupResponse(unitId:string, groupId:string): MoveUnitToGroupResponseAction {
    return {
        type: BattleTypeKeys.MOVE_UNIT_TO_GROUP_RESPONSE,
        unitId,
        groupId
    }
}

export type BattleActionRequestTypes = RollDicesRequestAction
    | DiceSelectRequestAction
    | KeepDicesRequestAction

export type BattleActionTypes = AssignDiceRequestAction
    | RollDicesResponseAction
    | KeepDicesResponseAction
    | SetUnitPhaseResponseAction
    | AcceptAssignmentAction
    | PlayerQueryResponseAction
    | AssignDiceResponseAction
    | DamageUnitResponseAction
    | KillUnitResponseAction
    | MoveUnitToGroupResponseAction
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