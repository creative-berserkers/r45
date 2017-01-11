import css from 'style.css'
import * as React from 'react'

export default class DicePoolComponent extends React.Component {

  render(){
    const {className} = this.props

    return <div className={`${className} ${css.dicePoolComponent}`}>
      {this.props.children}
    </div>
  }
}
