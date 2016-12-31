export function client(rootState, guid){
  return rootState.contexts[guid].shared
}