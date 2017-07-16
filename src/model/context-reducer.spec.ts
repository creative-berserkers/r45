import {expect} from 'chai'
import contextReducer, {
  setPlayerNameAction,
  setPlayerClassIdAction,
  setPlayerRaceIdAction,
  pushClientStateAction,
  popClientStateAction,
  stackAction,
  getClassId,
  getStack,
  getPlayerName,
  getLastStackState,
  getLastStackStateName,
  getStackStateWithName
} from  './context-reducer'

describe('context-reducer', () => {

  describe('contextReducer', () => {
    it('should set player name', () => {
      const oldState = {playerName: 'none'}

      const newState = contextReducer(oldState, setPlayerNameAction('New Name'))

      expect(newState).to.deep.equal({
        playerName: 'New Name'
      })
    })

    it('should set player classId', () => {
      const oldState = {classId: 'none'}

      const newState = contextReducer(oldState, setPlayerClassIdAction('mage'))

      expect(newState).to.deep.equal({
        classId: 'mage'
      })
    })

    it('should set player raceId', () => {
      const oldState = {raceId: 'none'}

      const newState = contextReducer(oldState, setPlayerRaceIdAction('elf'))

      expect(newState).to.deep.equal({
        raceId: 'elf'
      })
    })

    it('should push state to the stack', () => {
      const oldState = {stack: []}

      const newState = contextReducer(oldState, pushClientStateAction('setup', {id: 'someId'}))

      expect(newState).to.deep.equal({
        stack: [{id: 'someId'}]
      })
    })

    it('should pop state from the stack', () => {
      const oldState = {stack: [{id: 'someId'}]}

      const newState = contextReducer(oldState, popClientStateAction({id: 'someId'}))

      expect(newState).to.deep.equal({
        stack: []
      })
    })

    it('should modify stack state', () => {
      const oldState = {stack: [{name: 'someName', id: 'someId'}]}
      const stateAction = {type: 'SOME_TYPE', id: 'someId'};

      let stackStateReducerCalled = 0

      const newState = contextReducer(oldState, stackAction(stateAction), {
        'someName': (state, action) => {
          stackStateReducerCalled++
          expect(action).to.deep.equal(stateAction)
          expect(state).to.deep.equal(oldState.stack[0])
          return {name: 'someName',id: 'someId', newProp:'someNewProp'}
        }
      })

      expect(newState).to.deep.equal({
        stack: [{name: 'someName',id: 'someId', newProp:'someNewProp'}]
      })
      expect(stackStateReducerCalled).to.equal(1)
    })
  })

  describe('getClassId', () => {
    it('should return classId', () => {
      const state = {classId: 'mage'}

      const classId = getClassId(state)

      expect(classId).to.equal('mage')
    })
  })

  describe('getStack', () => {
    it('should return stack', () => {
      const state = {stack: [{someState: 'someState'}]}

      const stack = getStack(state)

      expect(stack).to.deep.equal([{someState: 'someState'}])
    })
  })

  describe('getPlayerName', () => {
    it('should return playerName', () => {
      const state = {playerName: 'player A'}

      const playerName = getPlayerName(state)

      expect(playerName).to.equal('player A')
    })
  })

  describe('getLastStackState', () => {
    it('should return last stack state', () => {
      const state = {stack: [{someState: 'someState'}, {someOtherState: 'someOtherState'}]}

      const stack = getLastStackState(state)

      expect(stack).to.deep.equal({someOtherState: 'someOtherState'})
    })
  })

  describe('getLastStackStateName', () => {
    it('should return last stack state name', () => {
      const state = {stack: [{name: 'someState'}, {name: 'someOtherState'}]}

      const lastStackStateName = getLastStackStateName(state)

      expect(lastStackStateName).to.equal('someOtherState')
    })
  })

  describe('getStackStateWithName', () => {
    it('should return stack state with name', () => {
      const state = {stack: [{name: 'someState'}, {name: 'someOtherState'}]}

      const stackStateWithName = getStackStateWithName(state, 'someState')

      expect(stackStateWithName).to.deep.equal({name: 'someState'})
    })

    it('should return undefined', () => {
      const state = {stack: [{name: 'someState'}, {name: 'someOtherState'}]}

      const stackStateWithName = getStackStateWithName(state, 'nonExistingName')

      expect(stackStateWithName).to.deep.equal(undefined)
    })
  })
})