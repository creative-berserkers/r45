import css from './style.css'
import * as React from 'react'

export default class MessageLog extends React.Component {

  constructor() {
    super()
  }

  componentDidUpdate(){
    this.refs.messages.scrollTop = this.refs.messages.scrollHeight
    this.refs.chatInput.focus()
  }

  render(){


    let handleClick = ()=>{
      this.props.onSend(this.refs.chatInput.value)
      this.refs.chatInput.value = ''
    }

    let handleKeyboard = (e)=>{
      if (e.key === 'Enter') {
        handleClick()
      }
    }

    return <div className={`${this.props.className} ${css.messageLogContainer}`}>
      <div key="list" ref="messages" className={css.messageLogContainerList}>
        { this.props.children }
      </div>
      <input key="input" className={css.messageLogContainerInput} ref="chatInput" onKeyUp={handleKeyboard}></input>
      <button key="send" className={css.messageLogContainerSend} onClick={handleClick} >Send</button>
    </div>
  }
}