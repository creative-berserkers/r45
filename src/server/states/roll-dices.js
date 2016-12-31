import {message, popState} from '../../model/context-reducer'
import {client} from '../../model/selectors/global'
import {name, className} from '../../model/selectors/client'
import {randomInt, uniqueArray} from '../../utils'
import {roll, lock} from '../../model/client-action-state/roll-dices'
import {numberOfRerolls, rolledDices, locks} from '../../model/selectors/client-action-state'
import log from '../log'

function onFinishRolling(getState, guid, dispatch){
  const state = getState()
  const player = `${name(client(state, guid))}[${className(client(state, guid))}]`
  dispatch(message('GM', 'all', `${player} is rolling: ${rolledDices(client(state, guid))}`))
  dispatch(popState(guid))
}

export default {
  onEnter: (guid, getState, dispatch)=>{
    const firstRoll = [randomInt(1,7),randomInt(1,7), randomInt(1,7), randomInt(1,7)]
    const locks = [false, false, false, false]
    dispatch(roll(guid, firstRoll))
    dispatch(lock(guid, locks))
    /*dispatch(message('GM', guid, `Your initial roll is: ${firstRoll}.` +
      'If you want to reroll, type /reroll <number> ... <number>. Where <number> is index of dice you want to reroll or /keep'))
    */
  },
  onCommand:(guid, getState, dispatch, command)=>{
    const state = getState()
    if(command.startsWith('/reroll')){
      const currentDices = rolledDices(client(state, guid))
      const currentLocks = locks(client(state, guid))
      const newDices = currentDices.map((el,index) => {
        if(!currentLocks[index]){
          return randomInt(1,7)
        } else {
          return el
        }
      })
      //dispatch(message('GM', guid, `After ${numberOfRerolls(client(state, guid))} rerolls, you have: ${newDices}`))

      dispatch(roll(guid, newDices))
    } else if(command.startsWith('/keep')){
      onFinishRolling(state, guid, dispatch)
    } else if(command.startsWith('/lock')){
      const splited = command.split(' ')
      if(splited.length === 2){
        const index = +(splited[1])
        const currentLocks = locks(client(state, guid))
        let newLocks = currentLocks.slice(0,currentLocks.length)
        newLocks[index] = !newLocks[index]
        dispatch(lock(guid, newLocks))
      }
    } else {
      dispatch(message('GM', guid, 'Unrecognized command, please use /reroll <number> ... <number> or /keep'))
    }
    if(numberOfRerolls(client(state, guid)) >= 2){
      onFinishRolling(getState, guid, dispatch)
    }
  }
}