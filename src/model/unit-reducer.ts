/*import { createStackReducer, head, push, splitLastTwo, StackReducer, State } from 'stack-fsm-reducer'
import { Action } from 'redux'

export type INIT_STATE_ID = ''

export type SETUP = 'setup'
export const SETUP: SETUP = 'setup'
export type ROLL = 'roll'
export const ROLL: ROLL = 'roll'
export type ASSIGN = 'assign'
export const ASSIGN: ASSIGN = 'assign'
export type PLAY = 'play'
export const PLAY: PLAY = 'play'

export type AllUnitStateId = INIT_STATE_ID | SETUP | ROLL | ASSIGN | PLAY

export interface PlayerAction {
  actionId: string
  dices: string[]
}

export interface SetupUnitState extends State<SETUP> {
  stateId: SETUP
  actions: PlayerAction[]
  numberOfDices: number
  numberOfRerolls: number
}

export interface DiceState {
  face: number
  keep: boolean
}

export interface RollUnitState extends State<ROLL> {
  stateId: ROLL
  dices: DiceState[]
  numberOfRolls: number
}

export type DiceAssignment = { [actionId: string]: number[] }

export interface AssignUnitState extends State<ASSIGN> {
  stateId: ASSIGN,
  dices: number[]
  assignments: DiceAssignment
}

export interface PlayUnitState extends State<PLAY> {
  stateId: PLAY,
  activatedActions: string[]
}

export type AllUnitStates = SetupUnitState | RollUnitState | AssignUnitState | PlayUnitState

const INIT_STATE: SetupUnitState = {
  stateId: SETUP,
  actions: [
    {
      actionId: 'move',
      dices: ['3']
    },
    {
      actionId: 'fireball',
      dices: ['4']
    }
  ],
  numberOfDices: 3,
  numberOfRerolls: 1
}

const initReducer: StackReducer<AllUnitStates, AllUnitStateId, any> = (stack) => push(stack, INIT_STATE)

const setupUnitReducer: StackReducer<AllUnitStates, AllUnitStateId, any> = (stack: AllUnitStates[], action: StackRetAction) => {
  const setupState = head(stack) as SetupUnitState
  switch (action.type) {
    case STACK_RET_ACTION:
      switch(action.retState.stateId){
        case ROLL :
          const assignState: AssignUnitState = {
            assignments: setupState.actions.reduce(
                (acc,action) => {
                  acc[action.actionId] = []
                  return acc
                },{} as DiceAssignment),
            dices: action.retState.dices
          }
          return push(stack, assignState)
        case ASSIGN:
          //
          return stack
        default:
          return stack
      }
    default:
      const rollState: RollUnitState = {
        stateId: 'roll',
        numberOfRolls: 2,
        dices: [{face: 0, keep: false}, {face: 0, keep: false}]
      }
      return push(stack, rollState)
  }
}

export type SET_DICES = 'set-dices'
export const SET_DICES: SET_DICES = 'set-dices'

export interface SetDicesAction extends Action {
  type: SET_DICES,
  dices: DiceState[]
}

export const setDices = (dices: DiceState[]): SetDicesAction => {
  return {
    type: SET_DICES,
    dices
  }
}

const rollUnitReducer: StackReducer<AllUnitStates, AllUnitStateId, SetDicesAction> = (stack, action: SetDicesAction) => {
  const rollUnitState = head(stack) as RollUnitState
  switch (action.type) {
    case SET_DICES: {
      const newRollState: RollUnitState = {
        stateId: 'roll',
        dices: action.dices,
        numberOfRolls: rollUnitState.numberOfRolls--
      }
      if (newRollState.numberOfRolls === 0) {
        return ret(stack)
      }
      return replaceHead(stack, newRollState)
    }
    default: return stack
  }
}

export interface AssignDiceAction extends Action {
  dice: number
  actionId: string
}

const assignUnitReducer: StackReducer<AllUnitStates, AllUnitStateId, any> = (stack, action) => {
  switch (action.type) {
    default:
      return stack
  }
}
const playUnitReducer: StackReducer<AllUnitStates, AllUnitStateId, any> = (state) => state

export const unitReducer = createStackReducer({
  '': initReducer,
  'setup': setupUnitReducer,
  'roll': rollUnitReducer,
  'assign': assignUnitReducer,
  'play': playUnitReducer
})*/
