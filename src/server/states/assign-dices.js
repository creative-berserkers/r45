import {
  currentActionStateSelector,
  actionsSelector,
  messageAction,
  idSelector
} from '../../model/context-reducer'
import {clientSelector} from '../../model/global-reducer'

import {
  currentDicesSelector,
  assignedActionsSelector,
  assignDiceAction,
  resetAction
} from '../../model/client-action-state/assign-dices'
import {popStateAction} from '../../model/action-state-reducer'


export default {
  onCommand(guid, getState, dispatch, command){
    const state = getState()
    if (command.startsWith('/assign')) {
      const clientRolledDices = currentDicesSelector(currentActionStateSelector(clientSelector(state, guid)))
      const splited = command.split(' ')
      const actionIndex = +splited[1]
      const slotIndex = +splited[2]
      const clientActions = actionsSelector(clientSelector(state, guid))
      const selectedAction = clientActions[actionIndex]
      const selectedSlot = selectedAction.slots[slotIndex]
      const requiredDice = selectedSlot.require

      if (clientRolledDices.includes(requiredDice)) {
        dispatch(assignDiceAction(guid, actionIndex, slotIndex, requiredDice))
      }
    } else if (command.startsWith('/reset')) {
      dispatch(resetAction(guid))
    } else if (command.startsWith('/done')) {
      const player = idSelector(clientSelector(state, guid))
      const clientActions = actionsSelector(clientSelector(state, guid))
      const clientAssignedActions = assignedActionsSelector(currentActionStateSelector(clientSelector(state, guid)))

      const enabledActions = []

      clientActions.forEach((clientAction, actionIndex) => {
        const slots = clientAssignedActions[actionIndex]
        if (!slots) return
        let passed = true
        clientAction.slots.forEach((actionSlot, slotIndex) => {
          const dice = slots[slotIndex]
          if (actionSlot.require !== dice) {
            passed = false
          }
        })
        if (passed) {
          enabledActions.push(clientAction)
        }
      })

      dispatch(messageAction('GM', 'all', `${player} enabled [${enabledActions.map(a => a.name)}]`))
      dispatch(popStateAction(guid))
    }
  }
}