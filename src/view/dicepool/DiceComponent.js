import css from 'style.css'
import * as React from 'react'

const faces = ['⚀','⚁','⚂','⚃','⚄','⚅']
const colors = ['white','yellow','green','orange','blue','violet']

export default class DiceComponent extends React.Component {

  render(){
    const {
      className,
      face,
      lock,
      onClick} = this.props

    return <div className={`${className} ${css.dice} ${lock ? css.diceLocked : ''}`}
      style={{backgroundColor:colors[face-1]}}
      onClick={onClick}>
      <span>{faces[face-1]}</span>
    </div>
  }
}
