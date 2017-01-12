import {messageAction, setClassAction} from '../../model/context-reducer'
import {setStateAction} from '../../model/action-state-reducer'

const classes = ['mage', 'warrior', 'priest', 'hunter', 'stone']
const gateKeeper = 'Gate Keeper'

export default {
  onEnter: (guid, getState, dispatch)=>{
    //dispatch(message(gateKeeper, guid, 'Listen buddy, we have rules here, and the rules are: '+
    //  'Every fucker entering that town behind me must be on the list I have here. If not...'))
    //dispatch(message('GM', guid, 'Gate keeper looks at amulet you have on your neck.'))

    //dispatch(message(gateKeeper, guid,' well give me a second and I will sign you in.'))
    //dispatch(message(gateKeeper, guid,'I just need to know your class'))
    //dispatch(message('GM', guid, `Available classes are: ${classes.join(', ')} type in the name of the class you want`))
    dispatch(messageAction('GM', guid,`Class?[${classes.join(', ')}]`))
  },
  onCommand:(guid, getState, dispatch, command)=>{
    if(classes.includes(command)){
      //dispatch(message(gateKeeper, guid, 'Yes... yes... we allow those guys in, come in...'))
      dispatch(setClassAction(guid, command))
      dispatch(setStateAction(guid, 'townLobby'))
    } else {
      //dispatch(message(gateKeeper, guid, `No, we don\'t allow any ${command} in this town. You must be thinking about something else.`))
      dispatch(messageAction(gateKeeper, guid, `Unknown class ${command}.`))

    }
  }
}