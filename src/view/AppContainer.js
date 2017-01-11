import * as React from 'react'
import {connect} from 'react-redux'
import {currentActionState} from '../model/selectors/client'

import * as clientStates from './client-states'

class AppContainer extends React.Component {
  constructor() {
    super()
  }

  render(){
    const {clientState} = this.props
    if(!clientState) return <div>Loading...</div>

    const StateContainer = clientStates[clientState.name]
    return <StateContainer />
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
  }
}

const mapStateToProps = function(state) {
  return {
    clientState: currentActionState(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)