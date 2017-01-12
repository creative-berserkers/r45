import {messageAction} from '../../model/context-reducer'
import {pushStateAction} from '../../model/action-state-reducer'
import {clientSelector} from '../../model/global-reducer'
import log from '../log'

const GM = 'GM'

export default {
  onEnter: (guid, getState, dispatch)=>{
    dispatch(messageAction(GM, guid, 'You are entering battle.'))
    dispatch(pushStateAction(guid, 'rollDices'))
  },
  onReturn:(guid, getState, dispatch, fromState, returnedState)=>{
    log.info(`${guid} Return from state: `, fromState, returnedState)
    if(fromState === 'rollDices'){
      dispatch(pushStateAction(guid, 'assignDices', {
        rolledDices : returnedState.rolledDices
      }))
    }
  },
  onCommand:(guid, getState, dispatch, command)=>{
    const state = getState()

  }
}