import * as React from 'react'
import {connect} from 'react-redux'
import {currentClientStateSelector} from '../model/client-reducer'

import * as clientStates from './states'

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
    clientState: currentClientStateSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)