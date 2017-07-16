import {contextAction} from '../../model/all-contexts-reducer'
import {QUERY_RESPONSE} from '../../model/states/input-query'
import {popClientStateAction} from '../../model/context-reducer'

export default {
  onEnter: (getState, dispatch, next, {guid})=>{},
  onAction:(getState, dispatch, next, {action, guid})=>{
    switch(action.type){
      case QUERY_RESPONSE: {
        next(contextAction(guid,action))
        dispatch(contextAction(guid,popClientStateAction(action.message)))
      }
    }
  }
}