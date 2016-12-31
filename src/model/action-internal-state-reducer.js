export function setActionStateInternalState(guid, state){
  return {
    type : 'CLIENT_STATE_SET_INTERNAL_STATE',
    guid : guid,
    state : state
  }
}

export default function actionStateReducer(state = {}, action) {
  switch (action.type) {
    case 'CLIENT_STATE_SET_INTERNAL_STATE' : return action.state
    default : return state
  }
}