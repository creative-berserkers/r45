import {contextAction, getContext} from '../../model/all-contexts-reducer'
import {getLastStackState, popClientStateAction} from '../../model/context-reducer'
import {LIST_QUERY_RESPONSE, optionsSelector} from '../../model/states/list-query'

export default {
  onAction: (getState, dispatch, next, {action, guid}) => {
    switch (action.type) {
      case LIST_QUERY_RESPONSE: {
        const state = getState()
        const options = optionsSelector(getLastStackState(getContext(state, guid)))
        if (action.option >= 0 && action.option < options.length) {
          next(contextAction(guid, action))
          dispatch(contextAction(guid, popClientStateAction(options[action.option])))
        }
      }
    }
  }
}