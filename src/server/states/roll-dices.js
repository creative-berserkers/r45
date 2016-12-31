import {message, popState} from '../../model/context-reducer'
import {client} from '../../model/selectors/global'
import {name, className} from '../../model/selectors/client'
import {randomInt, uniqueArray} from '../../utils'
import {roll} from '../../model/client-action-state/roll-dices'
import {numberOfRerolls, rolledDices} from '../../model/selectors/client-action-state'
import log from '../log'

function onFinishRolling(state, guid, dispatch){
  const player = `${name(client(state, guid))}[${className(client(state, guid))}]`
  dispatch(message('GM', 'all', `${player} is rolling: ${rolledDices(client(state, guid))}`))
  dispatch(popState(guid))
}

export default {
  onEnter: (guid, state, dispatch)=>{
    const firstRoll = [randomInt(1,7),randomInt(1,7), randomInt(1,7), randomInt(1,7)]
    dispatch(roll(guid, firstRoll))
    dispatch(message('GM', guid, `Your initial roll is: ${firstRoll}.` +
      'If you want to reroll, type /reroll <number> ... <number>. Where <number> is index of dice you want to reroll or /keep'))
  },
  onCommand:(guid, state, dispatch, command)=>{
    if(command.startsWith('/reroll')){
      const dices = uniqueArray(command.replace('/reroll','').split(' ').map(el => +el))
      const currentDices = rolledDices(client(state, guid))
      log.info('currentDices ', currentDices)
      const newDices = currentDices.map((el,index) => {
        if(dices.includes(index+1)){
          return randomInt(1,7)
        } else {
          return el
        }
      })
      dispatch(message('GM', guid, `After ${numberOfRerolls(client(state, guid))} rerolls, you have: ${newDices}`))

      dispatch(roll(guid, newDices))
    } else if(command.startsWith('/keep')){
      onFinishRolling(state, guid, dispatch)
    } else {
      dispatch(message('GM', guid, 'Unrecognized command, please use /reroll <number> ... <number> or /keep'))
    }
    if(numberOfRerolls(client(state, guid)) >= 2){
      onFinishRolling(state, guid, dispatch)
    }
  }
}