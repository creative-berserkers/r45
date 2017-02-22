import {expect} from 'chai'
import setup from './setup'
import {INPUT_QUERY} from '../../model/states/input-query'
import {STACK_PUSH, PLAYER_NAME_SET, CLASS_ID_SET, RACE_ID_SET} from '../../model/context-reducer'
import {LIST_QUERY} from '../../model/states/list-query'
import {BATTLE} from '../../model/states/battle'
import {SETUP} from '../../model/states/setup'
import {CONTEXT_ACTION} from '../../model/all-contexts-reducer'

describe('setup', () => {
  it('should ask player for name', (done) => {
    const getState = () => ({})
    const dispatch = (action) => {
      expect(action).to.deep.equal({
        type: CONTEXT_ACTION,
        guid: 'AAA',
        action: {
          type: STACK_PUSH,
          name: INPUT_QUERY,
          initialState: {
            id: 'name',
            name: 'inputQuery',
            query: 'Name?'
          }
        }
      })
      done()
    }
    const next = () => {}

    setup.onEnter(getState, dispatch, next, {guid: 'AAA'})
  })

  it('should read player name and ask for class', (done) => {
    const getState = () => ({
      classes:['mage','druid','priest'],
      contexts: {
        'AAA': {
          stack: [{name: SETUP}]
        }
      }
    })
    const dispatch = (action) => {
      expect(action).to.deep.equal({
        type: CONTEXT_ACTION,
        guid: 'AAA',
        action: {
          type: STACK_PUSH,
          name: 'listQuery',
          initialState: {
            id: 'class',
            name: 'listQuery',
            options: ['mage','druid','priest'],
            query: 'Class?'
          }
        }
      })
      done()
    }
    const next = (action) => {
      expect(action).to.deep.equal({
        type: CONTEXT_ACTION,
        guid: 'AAA',
        action: {
          type: PLAYER_NAME_SET,
          playerName: 'PlayerName'
        }
      })
    }

    setup.onReturn(getState, dispatch, next, {guid: 'AAA', fromState: {id:'name'}, returnState: 'PlayerName'})
  })

  it('should read player class and ask for race', (done) => {
    const getState = () => ({
      classes:['mage','druid','priest'],
      races: ['human', 'elf'],
      contexts: {
        'AAA': {
          shared: [{name: SETUP}]
        }
      }
    })
    const dispatch = (action) => {
      expect(action).to.deep.equal({
        type: CONTEXT_ACTION,
        guid: 'AAA',
        action: {
          type: STACK_PUSH,
          initialState: {
            id: 'race',
            name: 'listQuery',
            options: ['human','elf'],
            query: 'Race?'
          },
          name: 'listQuery',
        }
      })
      done()
    }
    const next = (action) => {
      expect(action).to.deep.equal({
        type: CONTEXT_ACTION,
        action: {
          type: CLASS_ID_SET,
          classId: 'mage',
        },
        guid: 'AAA'
      })
    }

    setup.onReturn(getState, dispatch, next, {guid: 'AAA', fromState: {id:'class'}, returnState: 0})
  })

  it('should read player race and go to battle state', (done) => {
    const getState = () => ({
      races: ['human', 'elf'],
      contexts: {
        'AAA': {
          shared: [{name: SETUP, allRaces: ['human', 'elf']}]
        }
      }
    })
    const dispatch = (action) => {
      expect(action).to.deep.equal({
        action: {
          initialState: {},
          name: BATTLE,
          type: STACK_PUSH
        },
        guid: 'AAA',
        type: CONTEXT_ACTION
      })
      done()
    }
    const next = (action) => {
      expect(action).to.deep.equal({
        action: {
          type: RACE_ID_SET,
          raceId: 'elf',
        },
        type: CONTEXT_ACTION,
        guid: 'AAA'
      })
    }

    setup.onReturn(getState, dispatch, next, {guid: 'AAA', fromState: {id:'race'}, returnState: 1})
  })
})