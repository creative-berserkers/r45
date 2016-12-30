import {message} from '../../model/context-reducer'
import {name, className} from '../../selectors/shared-context'

const GM = 'GM'

export default {
  onEnter: (guid, state, dispatch)=>{
    dispatch(message(GM, guid, 'You are entering the town area. You see your friends here.'))
  },
  onCommand:(guid, state, dispatch, command)=>{
    dispatch(message(`${name(state, guid)}[${className(state, guid)}]`, 'all', command))
  }
}