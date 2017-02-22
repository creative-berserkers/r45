import {expect} from 'chai'
import inputQuery from './input-query'
import {INPUT_QUERY, queryResponseAction} from '../../model/states/input-query'
import {STACK_POP} from '../../model/context-reducer'

describe('inputQuery', ()=> {
  it('should return from the state when name is provided', (done) => {
    const queryResponseActionResult = queryResponseAction('SelectedName')

    const getState = ()=>({
      contexts : {
        'AAA' : {
          stack:[{name:INPUT_QUERY, id: 'name', query:'Name?'}]
        }
      }
    })
    const dispatch = (action)=>{
      expect(action.action.type).to.equal(STACK_POP)
      expect(action.action.returnState).to.equal('SelectedName')
      done()
    }
    const next = (action)=>{
      expect(action.action).to.equal(queryResponseActionResult)
    }

    inputQuery.onAction(getState,dispatch,next,{guid:'AAA', action:queryResponseActionResult})
  })
})