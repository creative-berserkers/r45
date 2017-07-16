import css from './style.css'
import * as React from 'react'

export default function HorizontalList({className, children}) {
  return <div className={`${className} ${css.horizontalList}`}>
    {children}
  </div>
}