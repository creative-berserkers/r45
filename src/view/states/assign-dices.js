import css from './style.css'
import * as React from 'react'
import {connect} from 'react-redux'
import {currentActionState} from '../../model/selectors/client'

import {MessageLog, Message} from '../messagelog'
import {DicePool, Dice, DiceSlot} from '../dicepool'
import {ActionPool, Action} from '../actionpool'
import {currentDices, assignedActions} from '../../model/selectors/state/assign-dices'

class AssignActionsContainer extends React.Component {
  constructor() {
    super()
  }

  renderDice(actions, actionIndex, slotIndex){
    const action = actions[actionIndex]
    if(!action) return undefined
    const dice = action[slotIndex]
    if(dice){
      return <Dice face={dice}/>
    } else {
      return undefined
    }
  }

  render() {
    const {messages, onSend, onReset, onAssign, onDone, dices, actions, assignedActions} = this.props
    return <div className={`${css.defaultState} ${css.assignDicesState}`}>
      <MessageLog onSend={onSend} className={css.chat}>
        {messages.map(({id, from, message}) => <Message key={id} from={from}
                                                        message={message}/>)}
      </MessageLog>
      <DicePool>
        <button className={css.midButton} onClick={onReset}>Reset dices</button>
        <button className={css.midButton} onClick={onDone}>Done</button>
        {dices.map((number, index) => <Dice className={css.diceSpace} key={index} face={number}/>)}
      </DicePool>
      <ActionPool className={css.actionpool}>
        {actions.map((action, actionIndex) =>
          <Action key={actionIndex} name={action.name}>
            {action.slots.map((slot, slotIndex) => <DiceSlot key={slotIndex} face={slot.require}
                                                             onClick={onAssign.bind(undefined, actionIndex, slotIndex)}>
              { this.renderDice(assignedActions, actionIndex, slotIndex)}
            </DiceSlot>)}
          </Action>)}
      </ActionPool>
    </div>
  }
}

const mapStateToDispatch = (dispatch) => {
  return {
    onSend: (command) => dispatch({type: 'COMMAND_REQUEST', command: command}),
    onReset: () => dispatch({type: 'COMMAND_REQUEST', command: '/reset'}),
    onDone: () => dispatch({type: 'COMMAND_REQUEST', command: '/done'}),
    onAssign: (actionIndex, slotIndex) => dispatch({
      type: 'COMMAND_REQUEST',
      command: `/assign ${actionIndex} ${slotIndex}`
    })
  }
}

const mapStateToProps = (state) => {
  return {
    dices: currentDices(currentActionState(state)),
    assignedActions : assignedActions(currentActionState(state)),
    messages: state.messages,
    actions: state.actions
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(AssignActionsContainer)