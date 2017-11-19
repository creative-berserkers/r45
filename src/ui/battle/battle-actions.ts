import {Action} from 'redux';
import {DiceState, GroupState, PlayerQuery, UnitState} from "./battle-reducer";

export enum BattleTypeKeys {
    PLAYER_ID_ASSIGNED = 'PLAYER_ID_ASSIGNED',
    ASSIGN_DICE_TO_CARD = 'ASSIGN_DICE_TO_CARD',
    UNASSIGN_DICE_TO_CARD = 'UNASSIGN_DICE_TO_CARD',
    ROLL_DICES_REQUEST = 'ROLL_DICES_REQUEST',
    ROLL_DICES_RESULT = 'ROLL_DICES_RESULT',
    KEEP_DICES = 'KEEP_DICES',
    ACCEPT_ASSIGNMENT = 'ACCEPT_ASSIGNMENT',
    CARD_PLAY = 'CARD_PLAY',
    PLAYER_QUERY_REQUEST = 'PLAYER_QUERY_REQUEST',
    PLAYER_QUERY_RESPONSE = 'PLAYER_QUERY_RESPONSE',
    OTHER_ACTION = '__any_other_action_type__'
}

export interface PlayerIdAssignedAction extends Action {
    type: BattleTypeKeys.PLAYER_ID_ASSIGNED,
    playerId: string
}

export interface AssignDiceToCardAction extends Action {
    type: BattleTypeKeys.ASSIGN_DICE_TO_CARD,
    diceId: string
    cardId: string
}

export interface UnassignDiceFromCardAction extends Action {
    type: BattleTypeKeys.UNASSIGN_DICE_TO_CARD,
    diceId: string | undefined
    cardId: string | undefined
}

export interface RollDicesResultAction extends Action {
    type: BattleTypeKeys.ROLL_DICES_RESULT,
    dices: DiceState[]
}

export interface RollDicesRequestAction extends Action {
    type: BattleTypeKeys.ROLL_DICES_REQUEST,
    unitId: string
}

export interface KeepDicesAction extends Action {
    type: BattleTypeKeys.KEEP_DICES
}

export interface AcceptAssignmentAction extends Action {
    type: BattleTypeKeys.ACCEPT_ASSIGNMENT
}

export interface CardPlayAction extends Action {
    type: BattleTypeKeys.CARD_PLAY
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

export interface OtherAction extends Action {
    type: BattleTypeKeys.OTHER_ACTION
}

export function playerIdAssigned(playerId:string): PlayerIdAssignedAction {
    return {
        type: BattleTypeKeys.PLAYER_ID_ASSIGNED,
        playerId
    }
}

export function assignDiceToCard(diceId: string, cardId: string): AssignDiceToCardAction {
    return {
        type: BattleTypeKeys.ASSIGN_DICE_TO_CARD,
        diceId,
        cardId
    }
}

export function unassignDiceFromCard(diceId: string | undefined, cardId: string | undefined): UnassignDiceFromCardAction {
    return {
        type: BattleTypeKeys.UNASSIGN_DICE_TO_CARD,
        diceId,
        cardId
    }
}

export function rollDicesRequest(unitId:string): RollDicesRequestAction {
    return {
        type: BattleTypeKeys.ROLL_DICES_REQUEST,
        unitId
    }
}

export function rollDicesResult(dices: DiceState[]): RollDicesResultAction {
    return {
        type: BattleTypeKeys.ROLL_DICES_RESULT,
        dices
    }
}

export function keepDices(): KeepDicesAction {
    return {
        type: BattleTypeKeys.KEEP_DICES
    }
}

export function acceptAssignment(): AcceptAssignmentAction {
    return {
        type: BattleTypeKeys.ACCEPT_ASSIGNMENT
    }
}

export function cardPlay(cardId: string): CardPlayAction {
    return {
        type: BattleTypeKeys.CARD_PLAY,
        cardId
    }
}

export function playerQueryRequest(query:PlayerQuery): PlayerQueryRequestAction {
    return {
        type: BattleTypeKeys.PLAYER_QUERY_REQUEST,
        query
    }
}

export function playerQueryResponse(selection: UnitState | GroupState): PlayerQueryResponseAction{
    return {
        type: BattleTypeKeys.PLAYER_QUERY_RESPONSE,
        selection
    }
}

export type BattleActionTypes = AssignDiceToCardAction
    | UnassignDiceFromCardAction
    | RollDicesResultAction
    | KeepDicesAction
    | AcceptAssignmentAction
    | PlayerQueryRequestAction
    | OtherAction


export enum BattleViewTypeKeys {
    SET_ACTIVE_UNIT_ID = 'SET_ACTIVE_UNIT_ID',
    OTHER_ACTION = '__any_other_action_type__'
}

export interface SetActiveUnitId extends Action {
    type: BattleViewTypeKeys.SET_ACTIVE_UNIT_ID
    unitId: string
}

export function setActiveUnitId(unitId:string):SetActiveUnitId{
    return {
        type: BattleViewTypeKeys.SET_ACTIVE_UNIT_ID,
        unitId
    }
}

export type BattleViewActionTypes = SetActiveUnitId