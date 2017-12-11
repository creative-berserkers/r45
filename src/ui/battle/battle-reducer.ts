import {BattleActionTypes, BattleViewActionTypes, BattleTypeKeys, BattleViewTypeKeys} from './battle-actions';
import {toIdMap} from "./battle-utils";

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

export interface DiceState {
    id: string
    face: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

export interface DiceStateMap {
    [key:string]: DiceState
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
    [key:string]: CardState
}

export interface GroupState {
    id: string
}

export interface GroupStateMap {
    [key:string] : GroupState
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
    baseHealth: number
    damage: number
    rolls: number
    phase: BattlePhases
    query: PlayerQuery[]
}

export interface UnitStateMap {
    [key:string]: UnitState
}

export interface DiceToCardAssignment {
    diceId: string
    cardId: string
}

export interface DiceToUnitAssignment {
    diceId: string
    unitId: string
}

export interface UnitToGroupAssignment {
    unitId: string
    groupId: string
}

export interface UnitToPlayerAssignment {
    unitId: string
    playerId: string
}

export interface CardToUnitAssignment {
    cardId: string
    unitId: string
}

export interface BattleState {
    dices: DiceStateMap
    cards: CardStateMap
    groups: GroupStateMap
    units: UnitStateMap
    diceToCardAssignments: DiceToCardAssignment[]
    diceToUnitAssignments: DiceToUnitAssignment[]
    unitToGroupAssignments: UnitToGroupAssignment[]
    unitToPlayerAssignments: UnitToPlayerAssignment[]
    cardToUnitAssignments: CardToUnitAssignment[]
}

export const INIT_ROLLS = 3

export const INITIAL_STATE: BattleState = {
    dices: toIdMap<DiceState>([
        {id: 'dice1', face: 0},
        {id: 'dice2', face: 0},
        {id: 'dice3', face: 0},
        {id: 'dice4', face: 0},
        {id: 'dice5', face: 0},
        {id: 'dice6', face: 0},
        {id: 'dice7', face: 0},
        {id: 'dice8', face: 0},
        {id: 'dice9', face: 0},
        {id: 'dice10', face: 0},
        {id: 'dice11', face: 0},
        {id: 'dice12', face: 0}
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
            initiative:50
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
            rolls: INIT_ROLLS,
            baseHealth: 10,
            damage: 0,
            phase: BattlePhases.ROLLING,
            query: [{
                select: PlayerQuerySelectTarget.DICE_ACTION,
                where: {
                    type:WhereClauseType.MATCH_ALL,
                    prop:'id',
                    operator:WhereClauseOperator.EQUAL,
                    value:'roll'
                }
            }]
        },
        {
            id: 'unit2',
            name: 'Unit2',
            rolls: INIT_ROLLS,
            baseHealth: 10,
            damage: 0,
            phase: BattlePhases.ROLLING,
            query: [{
                select: PlayerQuerySelectTarget.DICE_ACTION,
                where: {
                    type:WhereClauseType.MATCH_ALL,
                    prop:'id',
                    operator:WhereClauseOperator.EQUAL,
                    value:'roll'
                }
            }]
        },
        {
            id: 'unit3',
            name: 'Unit3',
            rolls: INIT_ROLLS,
            baseHealth: 10,
            damage: 0,
            phase: BattlePhases.ROLLING,
            query: [{
                select: PlayerQuerySelectTarget.DICE_ACTION,
                where: {
                    type:WhereClauseType.MATCH_ALL,
                    prop:'id',
                    operator:WhereClauseOperator.EQUAL,
                    value:'roll'
                }
            }]
        }
    ]),
    diceToCardAssignments: [],
    diceToUnitAssignments: [
        {diceId: 'dice1', unitId: 'unit1'},
        {diceId: 'dice2', unitId: 'unit1'},
        {diceId: 'dice3', unitId: 'unit1'},
        {diceId: 'dice4', unitId: 'unit1'},
        {diceId: 'dice5', unitId: 'unit2'},
        {diceId: 'dice6', unitId: 'unit2'},
        {diceId: 'dice7', unitId: 'unit3'},
        {diceId: 'dice8', unitId: 'unit3'}
    ],
    unitToGroupAssignments: [
        {unitId: 'unit1', groupId: 'group1'},
        {unitId: 'unit2', groupId: 'group3'},
        {unitId: 'unit3', groupId: 'group3'}
    ],
    unitToPlayerAssignments: [
        {unitId: 'unit1', playerId: 'player1'},
        {unitId: 'unit2', playerId: 'player1'}
    ],
    cardToUnitAssignments: [
        {cardId: 'heal', unitId: 'unit1'},
        {cardId: 'maneuver', unitId: 'unit1'},
        {cardId: 'teleport', unitId: 'unit1'},
        {cardId: 'fireball', unitId: 'unit1'},
        {cardId: 'maneuver', unitId: 'unit2'},
        {cardId: 'arrow', unitId: 'unit2'},
        {cardId: 'maneuver', unitId: 'unit3'},
        {cardId: 'axe', unitId: 'unit3'},
    ]
}

export function battleReducer(state: BattleState = INITIAL_STATE, action: BattleActionTypes): BattleState {
    switch (action.type) {
        case BattleTypeKeys.ASSIGN_DICE_RESPONSE:
            return {
                ...state,
                diceToCardAssignments: [...state.diceToCardAssignments.filter(a => a.diceId !== action.diceId).filter(a => a.cardId !== action.cardId), {
                    diceId: action.diceId,
                    cardId: action.cardId
                }].filter(a => a.cardId !== 'none')
            }
        case BattleTypeKeys.ROLL_DICES_RESPONSE: {
            const responseUnit = state.units[action.unitId]
            const newRolls = responseUnit.rolls - 1
            const newState = {
                ...state,
                dices: {...state.dices,...toIdMap(action.dices)},
                diceToCardAssignments: state.diceToCardAssignments
                    .filter(ass => action.dices.find(d => d.id === ass.diceId) === undefined)
                    .concat(
                        Object.keys(state.cards)
                            .filter((cardId) => state.cardToUnitAssignments.filter(ctu => ctu.unitId === action.unitId).find(ctu => ctu.cardId === cardId) !== undefined)
                            .reduce((acc, cardId) => {
                                const matchingDice = action.dices
                                    .filter(d => d.face === state.cards[cardId].require)
                                    .filter(d => state.diceToCardAssignments.filter(a => a.diceId === d.id))[0]
                                if (matchingDice) {
                                    return [...acc, {diceId: matchingDice.id, cardId: cardId}]
                                } else {
                                    return acc
                                }
                            }, [])),
                units: {
                    ...state.units,
                    [action.unitId] : {
                        ...responseUnit,
                        rolls: newRolls,
                        phase: newRolls === 0 ? BattlePhases.WAITING_FOR_OTHERS : responseUnit.phase === BattlePhases.ROLLING ? BattlePhases.REROLLING : responseUnit.phase,
                        query: newRolls === 0 ? [
                            {select: PlayerQuerySelectTarget.NONE},
                        ] : responseUnit.phase === BattlePhases.ROLLING ? [
                            {select: PlayerQuerySelectTarget.DICE},
                            {select: PlayerQuerySelectTarget.DICE_ACTION, where:{ type:WhereClauseType.MATCH_ALL, prop:'id',operator:WhereClauseOperator.EQUAL, value:'roll' }},
                            {select: PlayerQuerySelectTarget.DICE_ACTION, where:{ type:WhereClauseType.MATCH_ALL, prop:'id',operator:WhereClauseOperator.EQUAL, value:'keep' }}
                        ] : responseUnit.query
                    }
                }
            }
            const allPlayersPlaying = Object.keys(newState.units).every(unitId => newState.units[unitId].phase === BattlePhases.WAITING_FOR_OTHERS)
            if(allPlayersPlaying){
                return {
                    ...newState,
                    units: toIdMap<UnitState>(Object.keys(newState.units).map((unitId) => ({
                        ...newState.units[unitId],
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
                    })))
                }
            }
            return newState
        }
        case BattleTypeKeys.KEEP_DICES_RESPONSE:
            const responseUnit = state.units[action.unitId]
            const newState = {
                ...state,
                units : {
                    ...state.units,
                    [responseUnit.id]:{
                        ...responseUnit,
                        phase: BattlePhases.WAITING_FOR_OTHERS,
                        query:  [
                            {select: PlayerQuerySelectTarget.NONE},
                        ],
                        rolls: 0
                    }
                }
            }
            const allPlayersPlaying = Object.keys(newState.units).every(unitId => newState.units[unitId].phase === BattlePhases.WAITING_FOR_OTHERS)
            if(allPlayersPlaying){
                return {
                    ...newState,
                    units: toIdMap<UnitState>(Object.keys(newState.units).map((unitId) => ({
                        ...newState.units[unitId],
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
                    })))
                }
            }
            return newState
        case BattleTypeKeys.SET_UNIT_PHASE_RESPONSE:
            return {
                ...state,
                units : {...state.units,
                    [action.unitId] : {
                        ...state.units[action.unitId],
                        phase: action.phase
                    }
                }
            }
        case BattleTypeKeys.ACCEPT_ASSIGNMENT:
            return {
                ...state,
            }
        case BattleTypeKeys.PLAYER_QUERY_RESPONSE: {
            return {
                ...state,
                units: {
                    ...state.units,
                    [action.unitId]: {
                        ...state.units[action.unitId],
                        query:action.query
                    }
                }
            }
        }
        case BattleTypeKeys.DAMAGE_UNIT_RESPONSE: {
            return {
                ...state,
                units: {...state.units,
                    [action.unitId]:{
                        ...state.units[action.unitId],
                        damage: action.dmgAmount
                    }
                }
            }
        }
        case BattleTypeKeys.KILL_UNIT_RESPONSE: {
            // noinspection JSUnusedLocalSymbols
            const {[action.unitId]:omit,...rest} = state.units
            return {
                ...state,
                units: rest,
                unitToGroupAssignments: state.unitToGroupAssignments.filter(utga => utga.unitId !== action.unitId),
                unitToPlayerAssignments: state.unitToPlayerAssignments.filter(utpa => utpa.unitId !== action.unitId),
                cardToUnitAssignments: state.cardToUnitAssignments.filter(ctua => ctua.unitId !== action.unitId),
                diceToUnitAssignments: state.diceToUnitAssignments.filter(dtua => dtua.unitId !== action.unitId)
            }
        }
        case BattleTypeKeys.MOVE_UNIT_TO_GROUP_RESPONSE: {
            return {
                ...state,
                unitToGroupAssignments: state.unitToGroupAssignments
                    .filter(utga => utga.unitId !== action.unitId)
                    .concat({unitId:action.unitId,groupId:action.groupId})
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
