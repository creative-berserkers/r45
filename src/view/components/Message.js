import css from './style.css'
import * as React from 'react'

export default function Message({id, from, message}){
  return <div key={id}><span className={css.messageAuthorName}>{from}</span>:{message}</div>
}