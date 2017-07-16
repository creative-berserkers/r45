import css from 'style.css'
import * as React from 'react'

export default function Dice({
  className,
  face,
  lock,
  onClick
}) {

  const imagePath = `/public/img/dices/${face}_dots.png`

  return <div className={`${className} ${css.dice} ${lock ? css.diceLocked : ''}`}
              onClick={onClick}>
    <img src={imagePath} width="32px" height="32px"></img>
  </div>
}
