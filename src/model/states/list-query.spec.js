import {expect} from 'chai'
import listQueryReducer, {createListQuery} from './list-query'

describe('listQueryReducer', ()=>{
  it('should create initial state', ()=>{
    const newState = listQueryReducer(undefined, '@INIT@')
    expect(newState).to.deep.equal({name: 'listQuery', id: '', query:'', options:[]})
  })

  it('should handle CLIENT_STATE_PUSH action', ()=>{
    const newState = listQueryReducer(createListQuery({id:'testId', query:'testQuery',options:['aaa','bbb']}), '@INIT@')
    expect(newState).to.deep.equal({name: 'listQuery', id: 'testId', query:'testQuery', options: ['aaa','bbb']})
  })
})