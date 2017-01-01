import css from './style.css'
import * as React from 'react'
import ActionComponent from 'ActionComponent'
import DiceSlotComponent from '../dicepool/DiceSlotComponent'
import DiceComponent from '../dicepool/DiceComponent'
import {connect} from 'react-redux'

class ActionPoolComponent extends React.Component {
  constructor(){
    super()
  }

  render() {
    const {className, actions} = this.props
    return <div className={`${this.props.className} ${css.actionPoolComponent}`}>
      {actions.map(action =>
        <ActionComponent name={action.name}>
          <DiceSlotComponent face={6}></DiceSlotComponent>
          <DiceSlotComponent face={4}><DiceComponent face={4}></DiceComponent></DiceSlotComponent>
          <DiceSlotComponent face={2}></DiceSlotComponent>
        </ActionComponent>)}
    </div>
  }
}
const mapStateToProps = (state) => ({
  actions : state.actions
})

const mapDispatchToProps = (dispatch)=>({})

export default connect(mapStateToProps, mapDispatchToProps)(ActionPoolComponent)
