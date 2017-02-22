import {expect} from 'chai'
import listQuery from './list-query'
import {STACK_POP} from '../../model/context-reducer'
import {LIST_QUERY, listQueryResponseAction} from '../../model/states/list-query'

describe('listQuery', ()=> {
  it('should return from the state when class is provided', (done) => {
    const queryResponseActionResult = listQueryResponseAction(2)

    const getState = ()=>({
      contexts : {
        'AAA' : {
          stack:[{name:LIST_QUERY, id: 'name', query:'Name?', options: ['mage', 'druid', 'rouge']}]
        }
      }
    })
    const dispatch = (action)=>{
      expect(action.action.type).to.equal(STACK_POP)
      expect(action.action.returnState).to.equal('rouge')
      done()
    }
    const next = (action)=>{
      expect(action.action).to.equal(queryResponseActionResult)
    }

    listQuery.onAction(getState,dispatch,next,{guid:'AAA', action:queryResponseActionResult})
  })
})