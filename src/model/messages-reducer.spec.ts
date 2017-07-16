import {expect} from 'chai'
import messagesReducer, {
  messageAction,
} from './messages-reducer'

describe('setupReducer', () => {
  it('should create initial state', () => {
    const state = messagesReducer(undefined, {type: '@INIT@'})
    expect(state).to.deep.equal([])
  })

  it('should add message', () => {
    const oldState = []

    const newState = messagesReducer(oldState, messageAction('messageId', 'XXX', 'Test Message'))

    expect(newState).to.deep.equal([{
      from: 'XXX',
      id: 'messageId',
      message: 'Test Message'
    }])
  })
})