import {contextAction} from '../../model/all-contexts-reducer'
import {pushClientStateAction, setPlayerNameAction, setPlayerClassIdAction, setPlayerRaceIdAction} from '../../model/context-reducer'
import {INPUT_QUERY, createInputQuery} from '../../model/states/input-query'
import {LIST_QUERY, createListQuery} from '../../model/states/list-query'
import {allClassesSelector, allRacesSelector} from '../../model'
import {BATTLE} from '../../model/states/battle'


export default {
  onEnter: (getState, dispatch, next, {guid})=>{
    dispatch(contextAction(guid, pushClientStateAction(INPUT_QUERY, createInputQuery({id:'name', query:'Name?'}))))
  },
  onReturn:(getState, dispatch, next, {fromState, guid, returnState}) => {
    const state = getState()
    if(fromState.id === 'name'){
      const allClasses = allClassesSelector(state)
      next(contextAction(guid, setPlayerNameAction(returnState)))
      dispatch(contextAction(guid,pushClientStateAction(LIST_QUERY, createListQuery({id:'class', query:'Class?', options:allClasses}))))
    }
    if(fromState.id === 'class'){
      const allClasses = allClassesSelector(state)
      const allRaces = allRacesSelector(state)
      next(contextAction(guid, setPlayerClassIdAction(allClasses[returnState])))
      dispatch(contextAction(guid,pushClientStateAction(LIST_QUERY, createListQuery({id:'race', query:'Race?',options:allRaces}))))
    }
    if(fromState.id === 'race'){
      const allRaces = allRacesSelector(state)
      next(contextAction(guid, setPlayerRaceIdAction(allRaces[returnState])))
      dispatch(contextAction(guid,pushClientStateAction(BATTLE, {})))
    }
  }
}