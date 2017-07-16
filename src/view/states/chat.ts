import {STATE_NAME as CHAT_STATE_NAME, messageAction, setPlayerNameAction} from '../../model/states/chat'
import css from './style.css'
import * as React from 'react'
import {connect} from 'react-redux'

import MessageLog from '../components/MessageLog'
import Message from '../components/Message'
import {clientStateSelector} from '../../model/client-reducer'

class IntroductionComponent extends  React.Component {
  constructor() {
    super()
  }

  render() {
    const {messages, onSend} = this.props

    return <div className={`${css.defaultState} ${css.introductionState}`}>
      <MessageLog onSend={onSend} className={css.chat}>
        {messages.map(({id, from, message}) => <Message key={id} from={from} message={message}></Message>)}
      </MessageLog>
    </div>
  }
}

const mapStateToDispatch = (dispatch) => { return {
  onSend: (command) => {dispatch(setPlayerNameAction(command))}
} }

const mapStateToProps = (state) => {
  return {
    messages: clientStateSelector(state, CHAT_STATE_NAME).messages
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(IntroductionComponent)
