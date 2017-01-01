import css from 'style.css'
import * as React from 'react'

export default class DiceSlotComponent extends React.Component {

  render(){
    const {
      className,
      face,
      onClick} = this.props

    const imagePath = `url(/public/img/dices/${face}_dots_slot.png)`
    const style = {
      background : imagePath,
      backgroundSize: '32px 32px' ,
      backgroundRepeat: 'no-repeat'
    }

    return <div className={`${className} ${css.diceSlot}`}
                onClick={onClick} style={style}>
      {this.props.children}
    </div>
  }
}