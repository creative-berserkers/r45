import {expect} from 'chai'
import allClassesReducer from './all-classes-reducer'
import {initialState} from './all-classes-reducer'

describe('setupReducer', () => {
  it('should create initial state', () => {
    const newState = allClassesReducer(undefined, {type: '@INIT@'})
    expect(newState).to.deep.equal(initialState)
  })
})