import {BattleActionTypes, BattleViewActionTypes, BattleTypeKeys, BattleViewTypeKeys} from './battle-actions';
import {unitsSelector} from "./battle-selectors";

export interface WhereClause {
    type: 'match'
    prop: string
    operator: string
    value: undefined | string | string[]
}

export type PlayerQuerySelectTarget = 'unit' | 'card' |  'group' | 'none'

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

export type BattlePhases = 'rolling'
    | 'assigning'
    | 'playing-cards'

export interface UnitState {
    id: string
    name: string
    baseHealth: number
    damage: number
    rolls: number
    phase: BattlePhases
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
    query: PlayerQuery
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
    query: {select: 'none', where: undefined},
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
            phase: 'rolling'
        },
        {
            id: 'unit2',
            name: 'Unit2',
            rolls: INIT_ROLLS,
            baseHealth: 10,
            damage: 0,
            phase: 'rolling'
        },
        {
            id: 'unit3',
            name: 'Unit3',
            rolls: INIT_ROLLS,
            baseHealth: 10,
            damage: 0,
            phase: 'rolling'
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
            return {
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
                            phase: newRolls === 0 ? 'playing-cards' : unit.phase

                        }
                    }
                    return unit
                })
            }
        }
        case BattleTypeKeys.KEEP_DICES_RESPONSE:
            return {
                ...state,
                units : state.units.map((unit):UnitState => {
                    if(unit.id === action.unitId){
                        return {
                            ...unit,
                            phase: 'playing-cards',
                            rolls: 0
                        }
                    }
                    return unit
                })
            }
        case BattleTypeKeys.ACCEPT_ASSIGNMENT:
            return {
                ...state,
            }
        case BattleTypeKeys.PLAYER_QUERY_REQUEST: {
            return {
                ...state,
                query: action.query
            }
        }
        case BattleTypeKeys.DIRECT_DAMAGE_RESPONSE: {
            const targetUnitState = unitsSelector(state).find(u => u.id === action.targetUnitId)
            if(!targetUnitState) return state
            if(targetUnitState.health - action.dmgAmount < 0){
                return {
                    ...state,
                    units: state.units.filter(unit => unit.id !== action.targetUnitId),
                    unitToGroupAssignments: state.unitToGroupAssignments.filter(utga => utga.unitId !== action.targetUnitId),
                    unitToPlayerAssignments: state.unitToPlayerAssignments.filter(utpa => utpa.unitId !== action.targetUnitId),
                    cardToUnitAssignments: state.cardToUnitAssignments.filter(ctua => ctua.unitId !== action.targetUnitId),
                    diceToUnitAssignments: state.diceToUnitAssignments.filter(dtua => dtua.unitId !== action.targetUnitId)
                }
            } else {
                return {
                    ...state,
                    units: state.units.map(unit => {
                        if(unit.id === action.targetUnitId){
                            return {
                                ...unit,
                                damage: action.dmgAmount
                            }
                        }
                        return unit
                    })
                }
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
