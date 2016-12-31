export function name(state){
  return state.name
}

export function className(state){
  return state.className
}

export function actionState(state){
  return state.actionState
}

export function actionStateCount(state){
  return actionState(state).length
}

export function currentActionState(state){
  return state.actionState[state.actionState.length - 1]
}

export function currentActionStateName(state){
  return currentActionState(state).name
}