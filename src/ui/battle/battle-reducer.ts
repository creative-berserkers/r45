import {BattleActionTypes, BattleViewActionTypes, BattleTypeKeys, BattleViewTypeKeys} from './battle-actions';

export interface WhereClause {
    type: string
    prop: keyof (UnitState | GroupState)
    value: string | string[]
}

export interface PlayerQuery {
    from: 'unit' | 'group'
    where: WhereClause[]
}

export interface DiceState {
    id: string
    face: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

export interface CardState {
    id: string
    require: number
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
    query: PlayerQuery | undefined
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
    query: undefined,
    dices: [
        {id: 'dice1', face: 0},
        {id: 'dice2', face: 0},
        {id: 'dice3', face: 0},
        {id: 'dice4', face: 0}
    ],
    cards: [
        {id: 'heal', require: 1, target: 'self'},
        {id: 'maneuver', require: 3, target: 'self'},
        {id: 'teleport', require: 5, target: 'self'},
        {id: 'fireball', require: 6, target: 'remote-unit'}
    ],
    groups: [
        {id: 'group1'},
        {id: 'group2'},
        {id: 'group3'}
    ],
    units: [
        {id: 'unit1', name: 'Unit1', rolls: INIT_ROLLS, baseHealth: 10, phase:'rolling'},
        {id: 'unit2', name: 'Unit2', rolls: INIT_ROLLS, baseHealth: 10, phase:'rolling'},
        {id: 'unit3', name: 'Unit3', rolls: INIT_ROLLS, baseHealth: 10, phase:'rolling'}
    ],
    diceToCardAssignments: [],
    diceToUnitAssignments: [
        {diceId: 'dice1', unitId: 'unit1'},
        {diceId: 'dice2', unitId: 'unit1'},
        {diceId: 'dice3', unitId: 'unit1'},
        {diceId: 'dice4', unitId: 'unit1'},
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
        {cardId: 'maneuver', unitId: 'unit3'},
    ]
}

export function battleReducer(state: BattleState = INITIAL_STATE, action: BattleActionTypes): BattleState {
    switch (action.type) {
        case BattleTypeKeys.ASSIGN_DICE_TO_CARD:
            return {
                ...state,
                diceToCardAssignments: [...state.diceToCardAssignments, {diceId: action.diceId, cardId: action.cardId}]
            }
        case BattleTypeKeys.UNASSIGN_DICE_TO_CARD:
            return {
                ...state,
                diceToCardAssignments: state.diceToCardAssignments
                    .filter(assignment => assignment.diceId !== action.diceId && assignment.cardId !==action.cardId)
            }
        case BattleTypeKeys.ROLL_DICES_RESULT: {
            //const newRolls = state.rolls - 1
            return {
                ...state,
                //rolls: newRolls,
                dices: action.dices,
                diceToCardAssignments: state.cards.reduce((acc,card) => {
                    const matchingDice = action.dices
                        .filter(d => d.face === card.require)
                        .filter(d => state.diceToCardAssignments.filter(a => a.diceId === d.id))[0]
                    if(matchingDice){
                        return [...acc, {diceId: matchingDice.id,cardId: card.id}]
                    } else {
                        return acc
                    }
                },[])
            }
        }
        case BattleTypeKeys.KEEP_DICES:
            return {
                ...state,
                dices: state.dices.map(dice => ({...dice, selected: false}))
            }
        case BattleTypeKeys.ACCEPT_ASSIGNMENT:
            return {
                ...state,
            }
        case BattleTypeKeys.PLAYER_QUERY_REQUEST: {
            return {
                ...state,
            }
        }
        default:
            return state
    }
}

export interface BattleViewState {
    activeUnitId: string
}

export const BATTLE_VIEW_INITIAL_STATE:BattleViewState = {
    activeUnitId: 'none'
}

export function battleViewReducer(state: BattleViewState = BATTLE_VIEW_INITIAL_STATE, action:BattleViewActionTypes ): BattleViewState {
    switch (action.type){
        case BattleViewTypeKeys.SET_ACTIVE_UNIT_ID: return {
            ...state,
            activeUnitId: action.unitId
        }
        default:
            return state
    }
}
