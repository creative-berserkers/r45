import css from './style.css'
import * as React from 'react'
import {connect} from 'react-redux'
import {currentActionState} from '../model/selectors/client'

import MessageLogContainer from './messagelog'
import DicePoolContainer from './dicepool'
import ActionPoolContainer from './actionpool'

class AppContainer extends React.Component {
  constructor() {
    super()
  }

  render(){
    const actionState = this.props.actionState
    const name = actionState ? actionState.name : 'none'
    if(name === 'rollDices'){
      return <div className={`${css.mainContainer} ${css.rollState}`}>
        <MessageLogContainer className={css.chat}></MessageLogContainer>
        <DicePoolContainer className={css.dicepool}></DicePoolContainer>
        <ActionPoolContainer className={css.action}></ActionPoolContainer>
      </div>
    } else {
      return <div className={css.mainContainer}>
        <MessageLogContainer className={css.chat}></MessageLogContainer>
        <ActionPoolContainer className={css.action}></ActionPoolContainer>
      </div>
    }
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
  }
}

const mapStateToProps = function(state) {
  return {
    actionState: currentActionState(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)