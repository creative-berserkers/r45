import * as React from 'react'
import {connect} from 'react-redux'

import * as clientStates from './states'
import {getStack} from '../model/context-reducer'
import {getClientGuid} from '../client/client-io'
import {Dispatch} from "redux";
import {Stack} from "../model/stack-reducer";
//import {getContext} from '../model/index'
//import {queryResponseAction} from '../model/states/input-query'

const stackViewMapping:any = {
  'setup:inputQuery': ([setupState, {query}]:[any,any], dispatch:Dispatch<any>) => {
    let inputVal = '';
    return <div>
      <span>Please provide your {query}</span>
      <input type="text" onChange={(event)=>{inputVal = event.target.value}}/>
      <input type="button" value="Send" onClick={()=>{}}/>
    </div>
  }
}

export function AppContainer({clientStateName, stack, dispatch}:{clientStateName:string, stack:Stack, dispatch:Dispatch<any>}):any {
  const view:any = stackViewMapping[clientStateName] || (():any=><div>View: '{clientStateName}' not found</div>);
  return view(stack, dispatch);
}

const mapDispatchToProps = function (dispatch:any) {
  return {dispatch}
}

const mapStateToProps = function (state:any) {
  //const stack = getStack(getContext(state, getClientGuid()));
  return {
    clientStateName: 'Temporarly disabled',//stack.map(state => state.name).join(':'),
    stack : []
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)