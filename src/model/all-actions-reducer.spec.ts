import {expect} from 'chai'
import allActionsReducer from './all-actions-reducer'
import {initialState} from './all-actions-reducer'

describe('setupReducer', () => {
  it('should create initial state', () => {
    const newState = allActionsReducer(undefined, {type: '@INIT@'})
    expect(newState).to.deep.equal(initialState)
  })
})