import {message, pushState} from '../../model/context-reducer'
import {name, className} from '../../selectors/shared-context'
import log from '../log'

const GM = 'GM'

export default {
  onEnter: (guid, state, dispatch)=>{
    dispatch(message(GM, guid, 'You are entering the town area. You see your friends here.'))
  },
  onReturn:(guid, state, dispatch, fromState)=>{
    log.info(`${guid} Return from state: `, fromState)
  },
  onCommand:(guid, state, dispatch, command)=>{
    if(command === '/roll'){
      dispatch(pushState(guid, 'rollDices'))
    } else{
      dispatch(message(`${name(state, guid)}[${className(state, guid)}]`, 'all', command))
    }
  }
}