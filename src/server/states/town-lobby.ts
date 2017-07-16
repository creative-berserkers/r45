import {messageAction} from '../../model/states/chat'
import {pushClientStateAction} from '../../model/client-reducer'
//import {clientSelector} from '../../model/global-reducer'

const GM = 'GM'

export default {
  onEnter: (guid, getState, dispatch)=>{
    dispatch(messageAction(GM, guid, 'You are entering the town area. You see your friends here.'))
  },
  onReturn:(guid, getState, dispatch, fromState, returnedState)=>{
    if(fromState === 'rollDices'){
      dispatch(pushClientStateAction('assignDices', {
        rolledDices : returnedState.rolledDices
      },guid))
    }
  },
  onCommand:(guid, getState, dispatch, command)=>{
    const state = getState()
    if(command === '/battle'){
      dispatch(pushClientStateAction( 'battle', {}, guid))
    } else{
      //dispatch(messageAction(idSelector(clientSelector(state, guid)), 'all', command))
    }
  }
}