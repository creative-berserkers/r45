import css from './style.css'
import * as React from 'react'

export default class MessageLogContainer extends React.Component {

  constructor() {
    super()
  }

  render(){
    const {id, from, message} = this.props

    return <div key={id}><span className={css.messageAuthorName}>{from}</span>:{message}</div>
  }
}