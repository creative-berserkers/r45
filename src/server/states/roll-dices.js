import {message, popState} from '../../model/context-reducer'
import {name, className} from '../../selectors/shared-context'
import {randomInt} from '../../utils'

export default {
  onEnter: (guid, state, dispatch)=>{
    const player = `${name(state, guid)}[${className(state, guid)}]`
    dispatch(message('GM', 'all', `${player} is rolling dices, result:`))
    dispatch(message('GM', 'all', `${[randomInt(1,6),randomInt(1,6), randomInt(1,6), randomInt(1,6)]}`))
    dispatch(popState(guid))
  },
  onCommand:(guid, state, dispatch, command)=>{

  }
}