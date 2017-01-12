import {messageAction, idSelector} from '../../model/context-reducer'
import {pushStateAction} from '../../model/action-state-reducer'
import {clientSelector} from '../../model/global-reducer'

const GM = 'GM'

export default {
  onEnter: (guid, getState, dispatch)=>{
    dispatch(messageAction(GM, guid, 'You are entering the town area. You see your friends here.'))
  },
  onReturn:(guid, getState, dispatch, fromState, returnedState)=>{
    if(fromState === 'rollDices'){
      dispatch(pushStateAction(guid, 'assignDices', {
        rolledDices : returnedState.rolledDices
      }))
    }
  },
  onCommand:(guid, getState, dispatch, command)=>{
    const state = getState()
    if(command === '/battle'){
      dispatch(pushStateAction(guid, 'battle'))
    } else{
      dispatch(messageAction(idSelector(clientSelector(state, guid)), 'all', command))
    }
  }
}