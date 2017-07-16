import {Action} from "redux";
export const BATTLE = 'BATTLE'


export function groupsSelector(state:any){
  return state.groups
}

const initialState = {
  name: 'battle',
  groups:[{
    id:'group1',
    unitrefs: ['orc1', 'orc2'],
  },{
    id:'group2',
    unitrefs: ['orc3','goblin1','goblin2']
  },{
    id:'group3',
    unitrefs:[]
  }],
  units :{
    'orc1' : {
      hp : {
        current: 10,
        max: 10
      }
    },
    'orc2':{
      hp : {
        current: 10,
        max: 10
      }
    },
    'orc3':{
      hp : {
        current: 10,
        max: 10
      }
    },
    'goblin1':{
      hp : {
        current: 10,
        max: 10
      }
    },
    'goblin2':{
      hp : {
        current: 10,
        max: 10
      }
    }
  }
}

export default function battle(state = initialState, action:Action) {
  switch (action.type) {
    default :
      return state
  }
}