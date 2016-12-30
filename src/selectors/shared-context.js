export function name(state, guid){
  return state.contexts[guid].shared.name
}

export function className(state, guid){
  return state.contexts[guid].shared.className
}