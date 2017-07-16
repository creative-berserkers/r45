/*import {contextAction} from '../../model/all-contexts-reducer'
import {pushClientStateAction} from '../../model/context-reducer'
import {loadStateAction} from '../../model/index'
import {createSetup, SETUP} from '../../model/states/setup'


export default {
  onEnter: (getState, dispatch, next, {guid})=>{
    next(contextAction(guid,loadStateAction(getState())))
    dispatch(contextAction(guid,pushClientStateAction(SETUP, createSetup())))
  },
  onReturn:(getState, dispatch, next, {fromState, guid, returnState}) => {
    //game ended
  }
}*/