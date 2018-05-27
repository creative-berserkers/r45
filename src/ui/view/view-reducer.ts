import { ViewTypes } from './view-props'
import { ViewActionTypes, ViewTypeKeys } from './view-actions'


export type ViewState = ViewTypes

export const VIEW_INITIAL_STATE: ViewState = 'menu'

export function battleViewReducer(state: ViewState = VIEW_INITIAL_STATE, action: ViewActionTypes): ViewState {
  switch (action.type) {
    case ViewTypeKeys.SET_VIEW:
      return action.payload
    default:
      return state
  }
}