import {createStackReducer, nextState, push, splitHead, Stack, State} from './stack-reducer'
import {Action} from "redux";

const playerSetupReducer = createStackReducer({})


export type PLAYER_JOIN = 'PLAYER_JOIN'
export const PLAYER_JOIN: PLAYER_JOIN = 'PLAYER_JOIN'


export interface PlayerJoinAction extends Action {
    type: PLAYER_JOIN,
    playerId: string
}

export const joinPlayer = (playerId: string): PlayerJoinAction => {
    return {
        type: PLAYER_JOIN,
        playerId
    }
}
export type PLAYER_ACTION = 'PLAYER_ACTION'
export const PLAYER_ACTION: PLAYER_ACTION = 'PLAYER_ACTION'

export interface PlayerActiom extends Action {
    type: PLAYER_ACTION,
    playerId: string,
    wrappedAction: Action
}

export const playerAction = (playerId: string, wrappedAction: Action): PlayerActiom => {
    return {
        type: PLAYER_ACTION,
        playerId,
        wrappedAction
    }
}

export type GAME_START = 'GAME_START'
export const GAME_START: GAME_START = 'GAME_START'

export interface StartGameAction extends Action {
    type: GAME_START
}

export const startGame = (): StartGameAction => {
    return {
        type: GAME_START
    }
}

export interface PlayersMap {
    [key:string]:Stack
}

export interface JoinState extends State {
    players: PlayersMap
}

export const gameReducer = createStackReducer({
    '': (stack: Stack, action: Action) => push(stack, nextState('join',{players: {}})),

    'join': (stack: Stack, action: Action) => {
        switch (action.type) {
            case PLAYER_JOIN: {
                const [tail, head] = splitHead(stack)
                if (head === undefined) return stack
                const state = head as JoinState;
                const playerJoinAction = action as PlayerJoinAction;
                return [...tail, {...head, players: {...state.players, [playerJoinAction.playerId]: []}}]
            }
            case PLAYER_ACTION: {
                const [tail, head] = splitHead(stack)
                if(head === undefined) return stack
                const state = head as JoinState
                const playerAction = action as PlayerActiom
                return [...tail, {
                    ...head,
                    players: {
                        ...state.players,
                        [playerAction.playerId]: playerSetupReducer(state.players[playerAction.playerId], playerAction.wrappedAction)
                    }
                }]
            }
            case 'GAME_START': {
                const [tail, head] = splitHead(stack)
                if(head === undefined) return stack
                const state = head as JoinState;
                return [...tail, nextState('play', {players: state.players})]
            }
            default:
                return stack
        }
    },

    'play': (stack: Stack, action: Action) => {
        return stack
    }
})