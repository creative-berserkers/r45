import {createStackReducer, push, ReducersMap, splitHead, Stack, StackReducer, State} from './stack-reducer'
import {Action} from 'redux'

export interface GroupState {
}

export type GroupsState = {
  [key: string]: GroupState
}

export interface UnitState {
  name: string
  classId: string
  groupId: string
  actions: string[]
}

export type UnitsState = {
  [key: string]: UnitState
}

export interface ActionState {
  name: string
  description: string
  select: string
}

export interface ActionsState {
  [key: string]: ActionState
}

export type INIT_STATE_ID = ''
export const INIT_STATE_ID: INIT_STATE_ID = ''

export type BATTLE_STATE_ID = 'battle'
export const BATTLE_STATE_ID: BATTLE_STATE_ID = 'battle'

export type AllStateId = BATTLE_STATE_ID | INIT_STATE_ID

export interface BattleState extends State<AllStateId> {
  groups: GroupsState
  units: UnitsState
  actions: ActionsState
}


export const battleState: BattleState = {
  stateId: 'battle',
  groups: {
    'group1': {},
    'group2': {},
    'group3': {}
  },
  units: {
    'unit1': {name: 'Richard', classId: 'mage', groupId: 'group1', actions: ['maneuver', 'fireball']},
    'unit2': {name: 'Steve', classId: 'warrior', groupId: 'group2', actions: ['maneuver', 'sword-cut']},
    'unit3': {name: 'Garry', classId: 'hunter', groupId: 'group3', actions: ['maneuver', 'piercing-arrow']}
  },
  actions: {
    'maneuver': {name: 'Maneuver', description: 'Moves your character to neighbour group', select: 'group'},
    'fireball': {name: 'Fireball', description: 'Fires a ball of fire at remote group unit', select: 'unit'},
    'sword-cut': {name: 'Sword cut', description: 'Performs a sword cut', select: 'unit'},
    'piercing-arrow': {name: 'Piercing Arrow', description: 'Shots an arrow at remote group unit', select:'unit'}
  }
}

export type GameStates = (BattleState)
export type GameActions = Action

export const initReducer: StackReducer<GameStates, AllStateId, GameActions> = (stack, action) => push(stack, battleState)

export const battleReducer: StackReducer<GameStates, AllStateId, GameActions> = (stack: Stack<BattleState, AllStateId>, action: GameActions) => {

  return stack
}

export type GameReducer = (state: Stack<GameStates, AllStateId>, action: GameActions) => Stack<GameStates, AllStateId>

export const gameReducer: GameReducer = createStackReducer({
  '': initReducer,

  'battle': battleReducer
})