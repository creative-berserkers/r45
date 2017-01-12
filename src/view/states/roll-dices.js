import css from './style.css'
import * as React from 'react'
import {connect} from 'react-redux'
import {currentActionStateSelector} from '../../model/context-reducer'

import HorizontalList from '../layout/HorizontalList'
import MessageLog from '../components/MessageLog'
import Message from '../components/Message'

import Dice from '../components/Dice'
import DiceSlot from '../components/DiceSlot'
import Action from '../components/Action'

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
      <HorizontalList className={css.dicepool}>
        <button className={css.rerollButton} onClick={(event)=>{onReroll()}}>Reroll dices</button>
        {dices.map((number, index)=><Dice className={css.diceSpace} key={index} face={number} lock={locks[index]} onClick={onLock.bind(undefined,index)}></Dice>)}
      </HorizontalList>
      <HorizontalList className={css.actionpool}>
        {actions.map((action, actionIndex) =>
          <Action key={actionIndex} name={action.name}>
            {action.slots.map((slot, slotIndex) => <DiceSlot key={slotIndex} face={slot.require}>
            </DiceSlot>)}
          </Action>)}
      </HorizontalList>
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
    dices : currentActionStateSelector(state).rolledDices,
    locks : currentActionStateSelector(state).locks,
    messages: state.messages,
    actions: state.actions
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(RollDicesContainer)
