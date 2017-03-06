import * as React from 'react'
import {connect} from 'react-redux'

import * as clientStates from './states'
import {getStack} from '../model/context-reducer'
import {getContext} from '../model/all-contexts-reducer'
import {getClientGuid} from '../client/client-io'

const stackViewMapping = {
  'setup:inputQuery': () => {
    return <h1>Hello world from setup:inputQuery</h1>
  }
}

export function AppContainer({clientStateName}) {
  return clientStateName ? stackViewMapping[clientStateName]() : <div>Loading...</div>
}

const mapDispatchToProps = function (dispatch) {
  return {}
}

const mapStateToProps = function (state) {
  return {
    clientStateName: getStack(getContext(state, getClientGuid())).map(state => state.name).join(':')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)