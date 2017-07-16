import shallowEqual from './shallow-equal'

export default function changed(oldState:any, newState:any){

  return shallowEqual(oldState, newState) ? oldState : newState
}