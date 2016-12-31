import {message, setState, setName} from '../../model/context-reducer'

export default {
  onEnter: (guid, getState, dispatch)=>{
    dispatch(message('GM', guid, 'You are entering town gate, the sign says "Welcome to Northwinter". Gate keeper is looking at you very suspiciously.'))
    dispatch(message('Gate Keeper', guid, 'Who the fuck are you?'))
    dispatch(message('GM' , guid, 'You are quite sure that not giving this man proper answer will get you into trouble. Please type your name.'))
  },
  onCommand:(guid, getState, dispatch, command)=>{
    const name = command
    dispatch(message('Gate Keeper', guid, `So... Your name is ${command}. I have never heard about you.`))
    dispatch(message('GM', guid, 'Gate Keeper now looks at you even more suspiciously.'))
    dispatch(setName(guid, name))
    dispatch(setState(guid, 'classSelection'))
  }
}