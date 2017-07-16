import {expect} from 'chai'
import {
  createStackReducer,
  nextState,
  path,
  head,
  push,
  pop,
  match,
  splitHead,
  splitLastTwo
} from './stack-reducer'

describe('stack-reducer', () => {

  describe('splitHead', () => {
    it('should split array into body and head', () => {
      const [tail, head] = splitHead(['one', 'two', 'three', 'four', 'five'])
      expect(tail).to.deep.equal(['one', 'two', 'three', 'four'])
      expect(head).to.equal('five')
    })

    it('should split single element array', () => {
      const [tail, head] = splitHead(['one'])
      expect(tail).to.deep.equal([])
      expect(head).to.equal('one')
    })

    it('should split empty array', () => {
      const [tail, head] = splitHead(['one'])
      expect(tail).to.deep.equal([])
      expect(head).to.equal('one')
    })
  })

  describe('splitLastTwo', () => {
    it('should split last two elements', () => {
      const [tail, neck, head] = splitLastTwo(['one', 'two', 'three', 'four', 'five'])
      expect(tail).to.deep.equal(['one', 'two', 'three'])
      expect(neck).to.equal('four')
      expect(head).to.equal('five')
    })

    it('should split two element array', () => {
      const [tail, neck, head] = splitLastTwo(['one', 'two'])
      expect(tail).to.deep.equal([])
      expect(neck).to.equal('one')
      expect(head).to.equal('two')
    })

    it('should split single element array', () => {
      const [tail, neck, head] = splitLastTwo(['one'])
      expect(tail).to.deep.equal([])
      expect(neck).to.equal(undefined)
      expect(head).to.equal('one')
    })

    it('should split empty array', () => {
      const [tail, neck, head] = splitLastTwo([])
      expect(tail).to.deep.equal([])
      expect(neck).to.equal(undefined)
      expect(head).to.equal(undefined)
    })
  })

  describe('getStackPath', () => {
    it('should return path of joined stateId separated by /', () => {
      const path = path([nextState('state1'), nextState('state2'), nextState('state3')])
      expect(path).to.equal('state1/state2/state3')
    })

    it('should return empty string on empty array', () => {
      const path = path([])
      expect(path).to.equal('')
    })
  })

  describe('push', () => {
    it('should push element to the stack', () => {
      const stack = push([nextState('state1')], nextState('state2'), nextState('state3'))
      expect(path(stack)).to.equal('state1/state2/state3')
    })
  })

  describe('pop', () => {
    it('should pop element from the stack', () => {
      const stack = pop([nextState('state1'), nextState('state2'), nextState('state3')])
      expect(path(stack)).to.equal('state1/state2')
    })
  })

  describe('match', ()=>{
    it('should match simple path', ()=>{
      const result = match('stateId1/stateId2', 'stateId1/stateId2')
      expect(result).to.equal(true)
    })

    it('should match glob path', ()=>{
      const result = match('stateId1/stateId2', '**/stateId2')
      expect(result).to.equal(true)
    })
  })

  describe('createStackReducer', () => {
    it('should run trough map of reducers', () => {
      const stackReducer = createStackReducer({
        '': (stack, action) => {
          return push(stack, nextState('setup'))
        },
        'setup': (stack, action) => {
          if (head(stack).playerName === undefined) {
            return push(stack, nextState('query', {query: 'Please enter your name', writeTo: 'playerName'}))
          } else if (head(stack).classId === undefined) {
            return push(stack, nextState('queryOption', {
              query: 'Please select your class',
              options: ['mage', 'druid'],
              writeTo: 'classId'
            }))
          } else {
            return stack
          }
        },
        '**/query': (stack, {type, response}) => {
          if (type === 'QUERY_RESPONSE') {
            const [tail, head, {writeTo}] = splitLastTwo(stack)
            return [...tail, {...head, [writeTo]: response}]
          }
          return stack
        },
        '**/queryOption': (stack, {type,optionId}) => {
          if (type === 'QUERY_OPTION_RESPONSE') {
            const [tail, head, {writeTo, options}] = splitLastTwo(stack)
            return [...tail, {...head, [writeTo]: options[optionId]}]
          }
          return stack
        }
      })

      const NON_EXISTING_ACTION = {type: 'NOT_EXISTING_ACTION'}
      const QUERY_RESPONSE = {type: 'QUERY_RESPONSE', response: 'John Smith'}
      const QUERY_OPTION_RESPONSE = {type: 'QUERY_OPTION_RESPONSE', optionId: 1}

      let state = stackReducer([], NON_EXISTING_ACTION)

      expect(path(state)).to.equal('setup/query')
      expect(head(state).query).to.equal('Please enter your name')
      expect(head(state).writeTo).to.equal('playerName')

      state = stackReducer(state, NON_EXISTING_ACTION)

      expect(path(state)).to.equal('setup/query')
      expect(head(state).query).to.equal('Please enter your name')
      expect(head(state).writeTo).to.equal('playerName')

      state = stackReducer(state, QUERY_RESPONSE)

      expect(path(state)).to.equal('setup/queryOption')
      expect(head(state).query).to.equal('Please select your class')
      expect(head(state).options).to.deep.equal(['mage', 'druid'])
      expect(head(state).writeTo).to.equal('classId')

      state = stackReducer(state, QUERY_OPTION_RESPONSE)

      expect(path(state)).to.equal('setup')
      expect(head(state).playerName).to.equal('John Smith')
      expect(head(state).classId).to.equal('druid')

      state = stackReducer(state, NON_EXISTING_ACTION)

      expect(path(state)).to.equal('setup')
      expect(head(state).playerName).to.equal('John Smith')
      expect(head(state).classId).to.equal('druid')
    })
  })

})