import css from './style.css'
import * as React from 'react'

export default function Action({className, name, children}){
  return <div className={`${className} ${css.actionComponent}`}>
    {name}
    <div className={css.diceSlot}>{children}</div>
  </div>
}
