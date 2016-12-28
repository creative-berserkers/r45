import log from '../log'

export default {
  onEnter: (guid, state, dispatch)=>{
    log.info('entering state INTRODUCTION')
  },
  onLeave: (guid, state, dispatch)=>{
    log.info('leaving state INTRODUCTION')
  },
  onCommand:(guid, state, dispatch, command)=>{
    log.info(`in state INTRODUCTION guid:${guid} command:${command}`)
  }
}