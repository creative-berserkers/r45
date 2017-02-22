import {messageAction} from '../../model/states/chat'
import {pushClientStateAction} from '../../model/client-reducer'
import log from '../log'

const GM = 'GM'

export default {
  onEnter: (guid, getState, dispatch)=>{
    dispatch(messageAction(GM, guid, 'You are entering battle.'))
    dispatch(pushClientStateAction('rollDices',guid))
  },
  onReturn:(guid, getState, dispatch, fromState, returnedState)=>{
    log.info(`${guid} Return from state: `, fromState, returnedState)
    if(fromState === 'rollDices'){
      dispatch(pushClientStateAction('assignDices', {
        rolledDices : returnedState.rolledDices
      },guid))
    }
  },
  onCommand:(guid, getState, dispatch, command)=>{
    //const state = getState()

  }
}