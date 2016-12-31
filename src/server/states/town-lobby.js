import {message, pushState} from '../../model/context-reducer'
import {client} from '../../model/selectors/global'
import {name, className} from '../../model/selectors/client'
import log from '../log'

const GM = 'GM'

export default {
  onEnter: (guid, getState, dispatch)=>{
    dispatch(message(GM, guid, 'You are entering the town area. You see your friends here.'))
  },
  onReturn:(guid, getState, dispatch, fromState)=>{
    log.info(`${guid} Return from state: `, fromState)
  },
  onCommand:(guid, getState, dispatch, command)=>{
    const state = getState()
    if(command === '/roll'){
      dispatch(pushState(guid, 'rollDices'))
    } else{
      dispatch(message(`${name(client(state, guid))}[${className(client(state, guid))}]`, 'all', command))
    }
  }
}