import {messageAction, currentActionStateSelector} from '../../model/context-reducer'
import {popStateAction} from '../../model/action-state-reducer'
import {clientSelector} from '../../model/global-reducer'
import {randomInt} from '../../utils'
import {rollAction, lockAction, numberOfRerollsSelector, rolledDicesSelector, locksSelector} from '../../model/client-action-state/roll-dices'

function onFinishRolling(getState, guid, dispatch) {
  dispatch(popStateAction(guid))
}

export default {
  onEnter: (guid, getState, dispatch) => {
    const firstRoll = [randomInt(1, 7), randomInt(1, 7), randomInt(1, 7), randomInt(1, 7), randomInt(1, 7)]
    const locks = [false, false, false, false]
    dispatch(rollAction(guid, firstRoll))
    dispatch(lockAction(guid, locks))
  },
  onCommand: (guid, getState, dispatch, command) => {
    const state = getState()
    if (command.startsWith('/reroll')) {
      const currentDices = rolledDicesSelector(currentActionStateSelector(clientSelector(state, guid)))
      const currentLocks = locksSelector(currentActionStateSelector(clientSelector(state, guid)))
      const newDices = currentDices.map((el, index) => {
        if (!currentLocks[index]) {
          return randomInt(1, 7)
        } else {
          return el
        }
      })
      //dispatch(message('GM', guid, `After ${numberOfRerolls(client(state, guid))} rerolls, you have: ${newDices}`))

      dispatch(rollAction(guid, newDices))
      if (numberOfRerollsSelector(currentActionStateSelector(clientSelector(state, guid))) >= 2) {
        onFinishRolling(getState, guid, dispatch)
      }
    } else if (command.startsWith('/keep')) {
      onFinishRolling(state, guid, dispatch)
    } else if (command.startsWith('/lock')) {
      const splited = command.split(' ')
      if (splited.length === 2) {
        const index = +(splited[1])
        const currentLocks = locksSelector(currentActionStateSelector(clientSelector(state, guid)))
        let newLocks = currentLocks.slice(0, currentLocks.length)
        newLocks[index] = !newLocks[index]
        dispatch(lockAction(guid, newLocks))
      }
    } else {
      dispatch(messageAction('GM', guid, 'Unrecognized command, please use /reroll <number> ... <number> or /keep'))
    }
  }
}