import css from './style.css'
import * as React from 'react'
import {connect} from 'react-redux'

import HorizontalList from '../layout/HorizontalList'
import MessageLog from '../components/MessageLog'
import Message from '../components/Message'
import {lastActionStateSelector} from '../../model/context-reducer';
import {groupsSelector} from '../../model/states/battle';

class BattleComponent extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {messages, onSend, groups, actions} = this.props

    return <div className={`${css.defaultState} ${css.battleState}`}>
      <MessageLog onSend={onSend} className={css.chat}>
        {messages.map(({id, from, message}) => <Message key={id} from={from} message={message}/>)}
      </MessageLog>
      <HorizontalList className={css.battlefield}>
        {groups.map(({name}, groupIndex) => <Group key={groupIndex} name={name}/>)}
      </HorizontalList>
      <HorizontalList className={css.actionpool}>
        {actions.map((action, actionIndex) =>
          <Action key={actionIndex} name={action.name}/>)}
      </HorizontalList>
    </div>
  }
}

const mapStateToDispatch = (dispatch) => { return {
  onSend: (command) => dispatch({type: 'COMMAND_REQUEST', command: command})
} }

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    groups : groupsSelector(lastActionStateSelector(state, 'battle')),
    actions: state.actions
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(BattleComponent)