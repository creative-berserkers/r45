const initialState = {
  'fireball': {
    name: 'Fireball',
    slots: [
      {
        require: 5
      },
      {
        require: 6
      }
    ]
  },
  'throw': {
    name: 'Throw',
    slots: [{
      require: 6
    }]
  }
}

export default function allActionsReducer(state = initialState, action) {
  return state
}