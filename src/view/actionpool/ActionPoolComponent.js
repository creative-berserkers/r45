import css from './style.css'
import * as React from 'react'
import {connect} from 'react-redux'

class ActionPoolComponent extends React.Component {
  constructor(){
    super()
  }

  render() {
    const {className} = this.props
    return <div className={`${this.props.className} ${css.actionPoolComponent}`}>
      {this.props.children}
    </div>
  }
}
const mapStateToProps = (state) => ({
  actions : state.actions
})

const mapDispatchToProps = (dispatch)=>({})

export default connect(mapStateToProps, mapDispatchToProps)(ActionPoolComponent)
