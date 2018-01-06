import {BattleActionTypes, BattleViewActionTypes, BattleTypeKeys, BattleViewTypeKeys} from './battle-actions';
import {toIdMap, getUniqueId, filterIdMap, updateIdMap, mapIdMapValues, everyIdMapValue} from "./battle-utils";
import {diceToCardAssignmentsSelector} from "./battle-selectors";

export enum WhereClauseType {
    MATCH_ALL = 'match-all',
    MATCH_ANY = 'match-any'
}

export enum WhereClauseOperator {
    EQUAL = '=',
    NOT_EQUAL = '!='
}

export interface WhereClause {
    type: WhereClauseType
    prop: string
    operator: WhereClauseOperator
    value: undefined | string | string[]
}

export enum PlayerQuerySelectTarget {
    UNIT = 'unit',
    CARD = 'card',
    GROUP = 'group',
    DICE = 'dice',
    DICE_ACTION = 'dice-action',
    NONE = 'none'
}

export interface PlayerQuery {
    select: PlayerQuerySelectTarget
    where?: WhereClause
}

export type DiceStateFaces = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface DiceState {
    id: string
    faces: [DiceStateFaces, DiceStateFaces, DiceStateFaces, DiceStateFaces, DiceStateFaces, DiceStateFaces]
    source: 'neutral' | 'fire' | 'shadow' | 'nature'
}

export interface DiceStateMap {
    [key: string]: DiceState
}

export interface CardState {
    id: string
    require: number
    initiative: number
    target: 'self'
        | 'local-group'
        | 'remote-group'
        | 'local-unit'
        | 'remote-unit'
}

export interface CardStateMap {
    [key: string]: CardState
}

export interface GroupState {
    id: string
}

export interface GroupStateMap {
    [key: string]: GroupState
}

export enum BattlePhases {
    ROLLING = 'rolling',
    REROLLING = 'rerolling',
    WAITING_FOR_OTHERS = 'waiting-for-others',
    PLAYING_CARDS = 'playing-cards'
}

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

export interface UnitStateMap {
    [key: string]: UnitState
}

export interface DiceToCardAssignment {
    id: string
    diceId: string
    cardId: string
    unitId: string
    rollResult: number
}

export interface DiceToCardAssignmentMap {
    [key: string]: DiceToCardAssignment
}


export interface CardToUnitAssignment {
    id: string
    cardId: string
    unitId: string
}

export interface CardToUnitAssignmentMap {
    [key: string]: CardToUnitAssignment
}

export interface BattleState {
    dices: DiceStateMap
    cards: CardStateMap
    groups: GroupStateMap
    units: UnitStateMap
    diceToCardAssignments: DiceToCardAssignmentMap
    cardToUnitAssignments: CardToUnitAssignmentMap
}

export const INIT_ROLLS = 3

export const INITIAL_STATE: BattleState = {
    dices: toIdMap<DiceState>([
        {id: 'dice1', faces: [1, 2, 3, 4, 5, 6], source: 'neutral'}
    ]),
    cards: toIdMap<CardState>([
        {
            id: 'heal',
            require: 1,
            target: 'self',
            initiative: 20
        },
        {
            id: 'maneuver',
            require: 3,
            target: 'self',
            initiative: 30
        },
        {
            id: 'teleport',
            require: 5,
            target: 'self',
            initiative: 80
        },
        {
            id: 'fireball',
            require: 6,
            target: 'remote-unit',
            initiative: 60
        },
        {
            id: 'axe',
            require: 6,
            target: 'local-unit',
            initiative: 50
        },
        {
            id: 'arrow',
            require: 6,
            target: 'remote-unit',
            initiative: 70
        }
    ]),
    groups: toIdMap<GroupState>([
        {id: 'group1'},
        {id: 'group2'},
        {id: 'group3'}
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
            phase: BattlePhases.ROLLING,
            query: [{
                select: PlayerQuerySelectTarget.DICE_ACTION,
                where: {
                    type: WhereClauseType.MATCH_ALL,
                    prop: 'id',
                    operator: WhereClauseOperator.EQUAL,
                    value: 'roll'
                }
            }]
        },
        {
            id: 'unit2',
            name: 'Unit2',
            groupId: 'group3',
            playerId: 'player1',
            rolls: INIT_ROLLS,
            baseHealth: 10,
            damage: 0,
            phase: BattlePhases.ROLLING,
            query: [{
                select: PlayerQuerySelectTarget.DICE_ACTION,
                where: {
                    type: WhereClauseType.MATCH_ALL,
                    prop: 'id',
                    operator: WhereClauseOperator.EQUAL,
                    value: 'roll'
                }
            }]
        },
        {
            id: 'unit3',
            name: 'Unit3',
            groupId: 'group3',
            playerId: 'player1',
            rolls: INIT_ROLLS,
            baseHealth: 10,
            damage: 0,
            phase: BattlePhases.ROLLING,
            query: [{
                select: PlayerQuerySelectTarget.DICE_ACTION,
                where: {
                    type: WhereClauseType.MATCH_ALL,
                    prop: 'id',
                    operator: WhereClauseOperator.EQUAL,
                    value: 'roll'
                }
            }]
        }
    ]),
    diceToCardAssignments: toIdMap<DiceToCardAssignment>([
        {id: getUniqueId('dtca'), unitId: 'unit1', diceId: 'dice1', cardId: 'unassigned', rollResult: 0},
        {id: getUniqueId('dtca'), unitId: 'unit1', diceId: 'dice1', cardId: 'unassigned', rollResult: 0},
        {id: getUniqueId('dtca'), unitId: 'unit1', diceId: 'dice1', cardId: 'unassigned', rollResult: 0},
        {id: getUniqueId('dtca'), unitId: 'unit1', diceId: 'dice1', cardId: 'unassigned', rollResult: 0},
        {id: getUniqueId('dtca'), unitId: 'unit2', diceId: 'dice1', cardId: 'unassigned', rollResult: 0},
        {id: getUniqueId('dtca'), unitId: 'unit2', diceId: 'dice1', cardId: 'unassigned', rollResult: 0},
        {id: getUniqueId('dtca'), unitId: 'unit2', diceId: 'dice1', cardId: 'unassigned', rollResult: 0},
        {id: getUniqueId('dtca'), unitId: 'unit2', diceId: 'dice1', cardId: 'unassigned', rollResult: 0},
        {id: getUniqueId('dtca'), unitId: 'unit3', diceId: 'dice1', cardId: 'unassigned', rollResult: 0},
        {id: getUniqueId('dtca'), unitId: 'unit3', diceId: 'dice1', cardId: 'unassigned', rollResult: 0},
        {id: getUniqueId('dtca'), unitId: 'unit3', diceId: 'dice1', cardId: 'unassigned', rollResult: 0},
        {id: getUniqueId('dtca'), unitId: 'unit3', diceId: 'dice1', cardId: 'unassigned', rollResult: 0}
    ]),
    cardToUnitAssignments: toIdMap<CardToUnitAssignment>([
        {id: getUniqueId('ctua'), cardId: 'heal', unitId: 'unit1'},
        {id: getUniqueId('ctua'), cardId: 'maneuver', unitId: 'unit1'},
        {id: getUniqueId('ctua'), cardId: 'teleport', unitId: 'unit1'},
        {id: getUniqueId('ctua'), cardId: 'fireball', unitId: 'unit1'},
        {id: getUniqueId('ctua'), cardId: 'maneuver', unitId: 'unit2'},
        {id: getUniqueId('ctua'), cardId: 'arrow', unitId: 'unit2'},
        {id: getUniqueId('ctua'), cardId: 'maneuver', unitId: 'unit3'},
        {id: getUniqueId('ctua'), cardId: 'axe', unitId: 'unit3'},
    ])
}

export function battleReducer(state: BattleState = INITIAL_STATE, action: BattleActionTypes): BattleState {
    switch (action.type) {
        case BattleTypeKeys.ASSIGN_DICE_RESPONSE:
            const {assignmentId, cardId} = action
            return {
                ...state,
                diceToCardAssignments: updateIdMap(state.diceToCardAssignments, assignmentId, (oldAssignment) => ({
                    ...oldAssignment,
                    cardId
                }))
            }
        case BattleTypeKeys.ROLL_DICES_RESPONSE: {
            const {unitId, result} = action
            const responseUnit = state.units[unitId]
            const newRolls = responseUnit.rolls - 1
            const newState = {
                ...state,
                diceToCardAssignments: mapIdMapValues(state.diceToCardAssignments, (assignment) => {
                    if (result[assignment.id]) {
                        return {
                            ...assignment,
                            rollResult: result[assignment.id]
                        }
                    }
                    return assignment
                }),
                units: updateIdMap(state.units, unitId, (oldUnit) => ({
                    ...oldUnit,
                    rolls: newRolls,
                    phase: newRolls === 0 ? BattlePhases.WAITING_FOR_OTHERS : oldUnit.phase === BattlePhases.ROLLING ? BattlePhases.REROLLING : oldUnit.phase,
                    query: newRolls === 0 ? [
                        {select: PlayerQuerySelectTarget.NONE},
                    ] : oldUnit.phase === BattlePhases.ROLLING ? [
                        {select: PlayerQuerySelectTarget.DICE},
                        {
                            select: PlayerQuerySelectTarget.DICE_ACTION,
                            where: {
                                type: WhereClauseType.MATCH_ALL,
                                prop: 'id',
                                operator: WhereClauseOperator.EQUAL,
                                value: 'roll'
                            }
                        },
                        {
                            select: PlayerQuerySelectTarget.DICE_ACTION,
                            where: {
                                type: WhereClauseType.MATCH_ALL,
                                prop: 'id',
                                operator: WhereClauseOperator.EQUAL,
                                value: 'keep'
                            }
                        }
                    ] : oldUnit.query
                }))
            }
            const allPlayersPlaying = Object.keys(newState.units).every(unitId => newState.units[unitId].phase === BattlePhases.WAITING_FOR_OTHERS)
            if (allPlayersPlaying) {
                return {
                    ...newState,
                    units: mapUnitsToAllPlayingCards(newState.units)
                }
            }
            return newState
        }
        case BattleTypeKeys.KEEP_DICES_RESPONSE: {
            const {unitId} = action
            const newState = {
                ...state,
                units: updateIdMap(state.units, unitId, (oldUnit) => ({
                    ...oldUnit,
                    phase: BattlePhases.WAITING_FOR_OTHERS,
                    query: [
                        {select: PlayerQuerySelectTarget.NONE},
                    ],
                    rolls: 0
                }))
            }
            if (everyIdMapValue(newState.units, ({phase}) => phase === BattlePhases.WAITING_FOR_OTHERS)) {
                return {
                    ...newState,
                    units: mapUnitsToAllPlayingCards(newState.units)
                }
            }
            return newState
        }
        case BattleTypeKeys.SET_UNIT_PHASE_RESPONSE: {
            const {unitId, phase} = action
            return {
                ...state,
                units: updateIdMap(state.units, unitId, (oldUnit) => ({...oldUnit, phase}))
            }
        }
        case BattleTypeKeys.ACCEPT_ASSIGNMENT:
            return {
                ...state,
            }
        case BattleTypeKeys.PLAYER_QUERY_RESPONSE: {
            const {unitId, query} = action
            return {
                ...state,
                units: updateIdMap(state.units, unitId, (oldUnit) => ({...oldUnit, query}))
            }
        }
        case BattleTypeKeys.DAMAGE_UNIT_RESPONSE: {
            const {unitId, dmgAmount: damage} = action
            return {
                ...state,
                units: updateIdMap(state.units, unitId, (oldUnit) => ({...oldUnit, damage}))
            }
        }
        case BattleTypeKeys.KILL_UNIT_RESPONSE: {
            // noinspection JSUnusedLocalSymbols
            const {unitId} = action
            const {[unitId]: omit, ...rest} = state.units
            return {
                ...state,
                units: rest,
                cardToUnitAssignments: filterIdMap(state.cardToUnitAssignments, (a) => a.unitId !== unitId),
                diceToCardAssignments: filterIdMap(state.diceToCardAssignments, (a) => a.unitId !== unitId)
            }
        }
        case BattleTypeKeys.MOVE_UNIT_TO_GROUP_RESPONSE: {
            const {groupId, unitId} = action
            return {
                ...state,
                units: updateIdMap(state.units, unitId, (oldUnit) => ({...oldUnit, groupId}))
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
    activeUnitId: 'none'
}

export function battleViewReducer(state: BattleViewState = BATTLE_VIEW_INITIAL_STATE, action: BattleViewActionTypes): BattleViewState {
    switch (action.type) {
        case BattleViewTypeKeys.SET_ACTIVE_UNIT_ID:
            return {
                ...state,
                activeUnitId: action.unitId
            }
        default:
            return state
    }
}

export const mapUnitsToAllPlayingCards = (units: UnitStateMap) => {
    return mapIdMapValues(units, (oldUnit) => ({
        ...oldUnit,
        phase: BattlePhases.PLAYING_CARDS,
        query: [{
            select: PlayerQuerySelectTarget.CARD,
            where: {
                type: WhereClauseType.MATCH_ALL,
                prop: 'diceId',
                operator: WhereClauseOperator.NOT_EQUAL,
                value: 'none'
            }
        }]
    }))

}