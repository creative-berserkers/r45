export const initialState = {
  'action_shield': {
    slots: [{
      require: 1
    }]
  },
  'action_maneuver': {
    slots: [{
      require: 3
    }]
  },
  'action_throw': {
    slots: [{
      require: 6
    }]
  },
  'action_fireball': {
    slots: [
      {
        require: 5
      },
      {
        require: 6
      }
    ]
  }
}

/**
 * @typedef {{require:number}} Slot
 * @typedef {{slots:Array.<Slot>}} Action
 * @typedef {Object.<string, Action>} AllActionState
 */

/**
 * @param {AllActionState} state
 * @param {*} action
 * @returns {AllActionState}
 */
export default function (state = initialState, action) {
  switch (action.type) {
    default :
      return state
  }
}