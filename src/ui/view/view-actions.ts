import { Action } from 'redux'
import { ViewTypes } from './view-props'

export enum ViewTypeKeys {
  // noinspection JSUnusedGlobalSymbols
  SET_VIEW = 'SET_VIEW',
  OTHER_ACTION = '__any_other_action_type__',
}

export interface SetViewAction extends Action {
  type: ViewTypeKeys.SET_VIEW
  payload: ViewTypes
}

export function setView(view: ViewTypes): SetViewAction {
  return {
    payload: view,
    type: ViewTypeKeys.SET_VIEW,
  }
}

export type ViewActionTypes = SetViewAction
