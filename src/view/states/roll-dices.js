import css from './style.css'
import * as React from 'react'
import {connect} from 'react-redux'
import {currentActionState} from '../../model/selectors/client'

import {MessageLog, Message} from '../messagelog'
import {DicePool, Dice, DiceSlot} from '../dicepool'
import {ActionPool, Action} from '../actionpool'

class RollDicesContainer extends  React.Component {
  constructor() {
    super()
  }

  render() {
    const {messages, onSend, onReroll, onLock, dices, locks, actions} = this.props

    return <div className={`${css.defaultState} ${css.rollDicesState}`}>
      <MessageLog onSend={onSend} className={css.chat}>
        {messages.map(({id, from, message}) => <Message key={id} from={from} message={message}></Message>)}
      </MessageLog>
      <DicePool>
        <button className={css.rerollButton} onClick={(event)=>{onReroll()}}>Reroll dices</button>
        {dices.map((number, index)=><Dice className={css.diceSpace} key={index} face={number} lock={locks[index]} onClick={onLock.bind(undefined,index)}></Dice>)}
      </DicePool>
      <ActionPool className={css.actionpool}>
        {actions.map((action, actionIndex) =>
          <Action key={actionIndex} name={action.name}>
            {action.slots.map((slot, slotIndex) => <DiceSlot key={slotIndex} face={slot.require}>
            </DiceSlot>)}
          </Action>)}
      </ActionPool>
    </div>
  }
}

const mapStateToDispatch = (dispatch) => { return {
  onSend: (command) => dispatch({type: 'COMMAND_REQUEST', command: command}),
  onReroll : ()=> dispatch({type: 'COMMAND_REQUEST', command: '/reroll'}),
  onLock:(index)=>dispatch({type: 'COMMAND_REQUEST', command: `/lock ${index}`})
} }

const mapStateToProps = (state) => {
  return {
    dices : currentActionState(state).rolledDices,
    locks : currentActionState(state).locks,
    messages: state.messages,
    actions: state.actions
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(RollDicesContainer)
