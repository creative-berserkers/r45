import {BattleActionTypes, BattleViewActionTypes, BattleTypeKeys, BattleViewTypeKeys} from './battle-actions';

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

export interface CardState {
    id: string
    require: number
    readyTime: number
    cooldownTime: number
    castTime: number
    target: 'self'
        | 'local-group'
        | 'remote-group'
        | 'local-unit'
        | 'remote-unit'
}

export interface GroupState {
    id: string
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
    dices: DiceState[]
    cards: CardState[]
    groups: GroupState[]
    units: UnitState[]
    diceToCardAssignments: DiceToCardAssignment[]
    diceToUnitAssignments: DiceToUnitAssignment[]
    unitToGroupAssignments: UnitToGroupAssignment[]
    unitToPlayerAssignments: UnitToPlayerAssignment[]
    cardToUnitAssignments: CardToUnitAssignment[]
}

export const INIT_ROLLS = 3

export const INITIAL_STATE: BattleState = {
    dices: [
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
    ],
    cards: [
        {
            id: 'heal',
            require: 1,
            target: 'self',
            readyTime: 200,
            cooldownTime: 2000,
            castTime: 100
        },
        {
            id: 'maneuver',
            require: 3,
            target: 'self',
            readyTime: 1000,
            cooldownTime: 500,
            castTime: 300
        },
        {
            id: 'teleport',
            require: 5,
            target: 'self',
            readyTime: 2000,
            cooldownTime: 5000,
            castTime: 1000
        },
        {
            id: 'fireball',
            require: 6,
            target: 'remote-unit',
            readyTime: 200,
            cooldownTime: 500,
            castTime: 300
        },
        {
            id: 'axe',
            require: 6,
            target: 'local-unit',
            readyTime: 200,
            cooldownTime: 300,
            castTime: 100
        },
        {
            id: 'arrow',
            require: 6,
            target: 'remote-unit',
            readyTime: 100,
            cooldownTime: 500,
            castTime: 100
        }
    ],
    groups: [
        {id: 'group1'},
        {id: 'group2'},
        {id: 'group3'}
    ],
    units: [
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
    ],
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
            const newState = {
                ...state,
                dices: state.dices.map(dice => action.dices.find(d => d.id === dice.id) || dice),
                diceToCardAssignments: state.diceToCardAssignments
                    .filter(ass => action.dices.find(d => d.id === ass.diceId) === undefined)
                    .concat(
                        state.cards
                            .filter((card) => state.cardToUnitAssignments.filter(ctu => ctu.unitId === action.unitId).find(ctu => ctu.cardId === card.id) !== undefined)
                            .reduce((acc, card) => {
                                const matchingDice = action.dices
                                    .filter(d => d.face === card.require)
                                    .filter(d => state.diceToCardAssignments.filter(a => a.diceId === d.id))[0]
                                if (matchingDice) {
                                    return [...acc, {diceId: matchingDice.id, cardId: card.id}]
                                } else {
                                    return acc
                                }
                            }, [])),
                units: state.units.map((unit): UnitState => {
                    if (unit.id === action.unitId) {
                        const newRolls = unit.rolls - 1
                        return {
                            ...unit,
                            rolls: newRolls,
                            phase: newRolls === 0 ? BattlePhases.WAITING_FOR_OTHERS : unit.phase === BattlePhases.ROLLING ? BattlePhases.REROLLING : unit.phase,
                            query: newRolls === 0 ? [
                                {select: PlayerQuerySelectTarget.NONE},
                            ] : unit.phase === BattlePhases.ROLLING ? [
                                {select: PlayerQuerySelectTarget.DICE},
                                {select: PlayerQuerySelectTarget.DICE_ACTION, where:{ type:WhereClauseType.MATCH_ALL, prop:'id',operator:WhereClauseOperator.EQUAL, value:'roll' }},
                                {select: PlayerQuerySelectTarget.DICE_ACTION, where:{ type:WhereClauseType.MATCH_ALL, prop:'id',operator:WhereClauseOperator.EQUAL, value:'keep' }}
                            ] : unit.query
                        }
                    }
                    return unit
                })
            }
            const allPlayersPlaying = newState.units.every(unit => unit.phase === BattlePhases.WAITING_FOR_OTHERS)
            if(allPlayersPlaying){
                return {
                    ...newState,
                    units: newState.units.map((unit:UnitState) => ({
                        ...unit,
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
            }
            return newState
        }
        case BattleTypeKeys.KEEP_DICES_RESPONSE:
            const newState = {
                ...state,
                units : state.units.map((unit):UnitState => {
                    if(unit.id === action.unitId){
                        return {
                            ...unit,
                            phase: BattlePhases.WAITING_FOR_OTHERS,
                            query:  [
                                {select: PlayerQuerySelectTarget.NONE},
                            ],
                            rolls: 0
                        }
                    }
                    return unit
                })
            }
            const allPlayersPlaying = newState.units.every(unit => unit.phase === BattlePhases.WAITING_FOR_OTHERS)
            if(allPlayersPlaying){
                return {
                    ...newState,
                    units: newState.units.map((unit:UnitState) => ({
                        ...unit,
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
            }
            return newState
        case BattleTypeKeys.SET_UNIT_PHASE_RESPONSE:
            return {
                ...state,
                units : state.units.map((unit):UnitState => {
                    if(unit.id === action.unitId){
                        return {
                            ...unit,
                            phase: action.phase
                        }
                    }
                    return unit
                })
            }
        case BattleTypeKeys.ACCEPT_ASSIGNMENT:
            return {
                ...state,
            }
        case BattleTypeKeys.PLAYER_QUERY_RESPONSE: {
            return {
                ...state,
                units: state.units.map(unit => {
                    if(unit.id === action.unitId || action.unitId === 'all'){
                        return {...unit, query:action.query}
                    }
                    return unit
                })
            }
        }
        case BattleTypeKeys.DAMAGE_UNIT_RESPONSE: {
            return {
                ...state,
                units: state.units.map(unit => {
                    if(unit.id === action.unitId){
                        return {
                            ...unit,
                            damage: action.dmgAmount
                        }
                    }
                    return unit
                })
            }
        }
        case BattleTypeKeys.KILL_UNIT_RESPONSE: {
            return {
                ...state,
                units: state.units.filter(unit => unit.id !== action.unitId),
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
