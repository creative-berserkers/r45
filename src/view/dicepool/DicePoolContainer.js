import css from 'style.css'
import * as React from 'react'
import {connect} from 'react-redux'
import {currentActionState} from '../../model/selectors/client'

import DiceComponent from './DiceComponent'

class DicePoolComponent extends React.Component {

  render(){
    const {className, dices, onReroll, onLock, locks} = this.props

    return <div className={`${className} ${css.dicePoolComponent}`}>
      <button className={css.rerollButton} onClick={(event)=>{onReroll()}}>Reroll dices</button>
      {dices.map((number, index)=><DiceComponent className={css.diceSpace} key={index} face={number} lock={locks[index]} onClick={onLock.bind(undefined,index)}></DiceComponent>)}
    </div>
  }
}

const mapStateToProps = (state) => ({
  dices : currentActionState(state).rolledDices,
  locks : currentActionState(state).locks
})

const mapDispatchToProps = (dispatch)=>({
  onReroll : ()=> {
    dispatch({type: 'COMMAND_REQUEST', command: '/reroll'})
  },
  onLock:(index)=>{
    dispatch({type: 'COMMAND_REQUEST', command: `/lock ${index}`})
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DicePoolComponent)
