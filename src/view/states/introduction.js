import css from './style.css'
import * as React from 'react'
import {connect} from 'react-redux'

import {MessageLog, Message} from '../messagelog'

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
  onSend: (command) => dispatch({type: 'COMMAND_REQUEST', command: command})
} }

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(IntroductionComponent)
