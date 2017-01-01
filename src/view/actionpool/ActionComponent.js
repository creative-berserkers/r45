import css from './style.css'
import * as React from 'react'

export default class ActionComponent extends React.Component {
  constructor() {
    super()
  }

  render(){

    const {name} = this.props

    return <div className={`${this.props.className} ${css.actionComponent}`}>
      {name}
      <div className={css.diceSlot}>{this.props.children}</div>
    </div>
  }
}
