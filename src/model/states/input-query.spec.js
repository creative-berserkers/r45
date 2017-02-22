import {expect} from 'chai'
import inputQueryReducer, {createInputQuery} from './input-query'

describe('inputQueryReducer', ()=>{
  it('should create initial state', ()=>{
    const newState = inputQueryReducer(undefined, '@INIT@')
    expect(newState).to.deep.equal({name: 'inputQuery', id: 'none', query:'none'})
  })

  it('should handle CLIENT_STATE_PUSH action', ()=>{
    const newState = inputQueryReducer(createInputQuery('testId', 'testQuery'), '@INIT@')
    expect(newState).to.deep.equal({name: 'inputQuery', id: 'testId', query:'testQuery'})
  })
})