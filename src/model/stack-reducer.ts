import * as minimatch from 'minimatch'
import {Action} from "redux";

export type State = {
  stateId:string;
}

export type Stack = State[]

export const nextState = (id:string, data:any = {}) : State => {
  return {stateId: id, ...data}
}

export const path = (stack:Stack) => {
  return stack.map(s => s.stateId).join('/')
}

export const head = (stack:Stack) => {
  return stack.length && stack[stack.length - 1]
}

export const push = (stack:Stack, ...state:Stack): State[] => {
  return [...stack, ...state]
}

export const pop = (stack:Stack) => {
  return stack.slice(0, stack.length - 1)
}

export const splitHead = (stack:Stack):[Stack,(State|undefined)] => {
  return stack.length > 0 ? [stack.slice(0, stack.length - 1), stack[stack.length - 1]] : [[], undefined]
}

export const splitLastTwo = (stack:Stack) => {
  if(stack.length >= 2){
    return [stack.slice(0, stack.length - 2), stack[stack.length - 2], stack[stack.length - 1]]
  } else if(stack.length === 1){
    return [[], undefined, stack[0]]
  } else {
    return [[], undefined, undefined]
  }
}

export const match = (path:string, query:string) => {
  return minimatch(path, query)
}

export interface ReducersMap {
  [key:string] : (state:Stack, action:Action) => Stack;
}

export const createStackReducer = (reducersMap:ReducersMap) => (state:Stack = [], action:Action) => {
  let prevState = undefined
  let MAX_ITER = 99
  let iter = 0
  while (true) {
    if (prevState === state) return state
    if (iter > MAX_ITER) throw Error('Max Iteration reached, probably loop')
    ++iter
    prevState = state
    state = Object.keys(reducersMap).reduce((acc, query) => match(path(state), query) ? reducersMap[query](acc, action) : acc, state)
  }
}