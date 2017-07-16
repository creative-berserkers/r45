(function (React,reactRedux,redux,ReactDOM) {
'use strict';

//import introduction from './introduction'
//import classSelection from './class-selection'
//import townLobby from './town-lobby'
//import rollDices from './roll-dices'
//import assignDices from './assign-dices'
//import battle from './battle'
//import chat from './chat'

const INPUT_QUERY = 'inputQuery';

const QUERY_RESPONSE = 'INPUT_QUERY:QUERY_RESPONSE';

/**
 * @typedef {{type: string, message: string}} ResponseAction
 */

/**
 * @param {string} message
 * @returns ResponseAction
 */
function queryResponseAction(message) {
  return {
    type: QUERY_RESPONSE,
    message
  };
}

/**
 * @param {{id:string}} state
 * @returns string
 */


/**
 * @param {{query:string}} state
 * @returns string
 */


/**
 * @typedef {{name: string, id: string, query: string}} InputQuery
 */

/**
 * @param {string} id
 * @param {string} query
 * @returns InputQuery
 */
function createInputQuery({ id = '', query = '' }) {
  return {
    name: INPUT_QUERY,
    id,
    query
  };
}

const initialState$1 = createInputQuery({ id: '', query: '' });

/**
 * @typedef {{name:string, id:string, query:string}} InputQueryState
 */

/**
 * @param {InputQueryState} state
 * @param {*} action
 * @returns {* | InputQueryState}
 */
function introduction(state = initialState$1, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const LIST_QUERY = 'listQuery';



/**
 * @param {number} option
 * @returns {{type: string, option: number}}
 */


/**
 * @param {{id:string}} state
 * @returns string
 */


/**
 * @param {{query:string}} state
 * @return string
 */


/**
 * @param {{options:Array}} state
 * returns Array
 */


/**
 * @typedef {{name: string, id: string, query: string, options: Array}} ListQuery
 */

/**
 * @param {string} id
 * @param {string} query
 * @param {Array} options
 * @returns ListQuery
 */
function createListQuery({ id = 'none', query = 'none', options = [] }) {
  return {
    name: LIST_QUERY,
    id,
    query,
    options
  };
}

const initialState$2 = createListQuery({ id: '', query: '', options: [] });

/**
 * @typedef {{name:string, id:string, query:string, options:Array}} ListQueryState
 */

/**
 * @param {ListQueryState} state
 * @param {*} action
 * @returns {* | ListQueryState}
 */
function introduction$1(state = initialState$2, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const SETUP = 'setup';

const initialState$3 = {
  name: SETUP
};



/**
 * @typedef {{
 *          name:string}} SetupState
 */

/**
 * @param {undefined | SetupState} state
 * @param { Action | PlayerNameAction | PlayerClassIdAction | PlayerRaceIdAction } action
 * @returns {* | SetupState}
 */
function introduction$2(state = initialState$3, action) {
  switch (action.type) {
    default:
      return state;
  }
}

//import rollDices from './roll-dices'
//import introduction from './introduction'
//import classSelection from './class-selection'
//import townLobby from './town-lobby'
//import assignDices from './assign-dices'
//import battle from './battle'


var allClientStateReducers = Object.freeze({
	inputQuery: introduction,
	listQuery: introduction$1,
	setup: introduction$2
});

const PLAYER_NAME_SET = 'PLAYER_NAME_SET';
const CLASS_ID_SET = 'CLASS_ID_SET';
const RACE_ID_SET = 'RACE_ID_SET';
const STACK_PUSH = 'STACK_PUSH';
const STACK_POP = 'STACK_POP';
const STACK_ACTION = 'STACK_ACTION';

/**
 * @typedef {{type: string, playerName: string}} PlayerNameAction
 */

/**
 * @param {string} playerName
 * @returns PlayerNameAction
 */


/**
 * @typedef {{type: string, classId: string}} PlayerClassIdAction
 */

/**
 * @param {string} classId
 * @returns PlayerClassIdAction
 */


/**
 * @typedef {{type: string, raceId: string}} PlayerRaceIdAction
 */

/**
 * @param {string} raceId
 * @returns PlayerRaceIdAction
 */


/**
 * @param action wrapped action
 * @returns {{type: string, action: Object}}
 */


/**
 * @typedef {{type: string, name: string, initialState: *}} PushClientStateAction
 */

/**
 * @param {string} name
 * @param {*} initialState
 * @returns {{type: string, name: string, initialState: *}}
 */




/**
 * @param {{classId:string}} state
 * @returns {string}
 */


/**
 * @param {{stack:Array}} state
 * @returns {Array}
 */
function getStack(state) {
  return state ? state.stack : [];
}

/**
 * @param {{playerName:string}} state
 * @returns {string}
 */


/**
 * @param {{stack:Array}} state
 * @returns {Object||undefined}
 */


/**
 * @param {{stack:Array.<{name}>}} state
 */


/**
 * @param {{stack:Array.<{name}>}} state
 * @param {string} name
 * @returns {Object}
 */


const initialState = {
  playerName: 'Noname',
  classId: 'mage',
  raceId: 'none',
  actions: [],
  stack: []
};

/**
 * @typedef {{playerName: string, classId: string, raceId: string, actions: Array, stack: Array}} Context
 */

/**
 * @param {Context} state
 * @param {PlayerNameAction|PlayerClassIdAction|PlayerRaceIdAction|PushClientStateAction} action
 * @param clientStateReducers
 * @returns {Context}
 */
function contextReducer(state = initialState, action, clientStateReducers = allClientStateReducers) {
  switch (action.type) {
    case PLAYER_NAME_SET:
      return Object.assign({}, state, {
        playerName: action.playerName
      });
    case CLASS_ID_SET:
      return Object.assign({}, state, {
        classId: action.classId
      });
    case RACE_ID_SET:
      return Object.assign({}, state, {
        raceId: action.raceId
      });
    case STACK_PUSH:
      return Object.assign({}, state, {
        stack: [...state.stack, clientStateReducers[action.name](action.initialState, { type: '@INIT@' })]
      });
    case STACK_POP:
      return Object.assign({}, state, {
        stack: state.stack.slice(0, state.stack.length - 1)
      });
    case STACK_ACTION:
      {
        const topAction = state.stack[state.stack.length - 1];
        if (topAction) {
          return Object.assign({}, state, {
            stack: state.stack.slice(0, state.stack.length - 1).concat(clientStateReducers[topAction.name](topAction, action.action))
          });
        }
        return state;
      }
    default:
      return state;
  }
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function guid() {

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var log = {
  debug(...args) {
    console.debug(...args);
  },
  info(...args) {
    console.info(...args);
  },
  warn(...args) {
    console.warn(...args);
  },
  error(...args) {
    console.error(...args);
  }
};

const CONTEXT_SPAWNED = 'CONTEXT_SPAWNED';
const CONTEXT_DESPAWNED = 'CONTEXT_DESPAWNED';
const CONTEXT_ACTION = 'CONTEXT_ACTION';



/**
 * @param {string} guid
 * @returns {{type: string, guid: string|undefined}}
 */




function allContextsReducer(state = {}, action) {
  switch (action.type) {
    case CONTEXT_SPAWNED:
      return Object.assign({}, state, { [action.guid]: contextReducer(state[action.guid], action) });
    case CONTEXT_DESPAWNED:
      return Object.assign({}, state, { [action.guid]: contextReducer(state[action.guid], action) });
    case CONTEXT_ACTION:
      return Object.assign({}, state, { [action.guid]: contextReducer(state[action.guid], action.action) });
    default:
      return state;
  }
}

const initialState$4 = {
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
    slots: [{
      require: 5
    }, {
      require: 6
    }]
  }
};

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
var allActionsReducer = function (state = initialState$4, action) {
  switch (action.type) {
    default:
      return state;
  }
};

const initialState$5 = {
  'class_mage': {
    actions: ['action_shield', 'action_maneuver', 'action_throw', 'action_fireball']
  },
  'class_druid': {
    actions: ['action_shield', 'action_maneuver', 'action_throw', 'action_fireball']
  }
};

/**
 * @typedef {{actions:Array.<string>}} Class
 * @typedef {Object.<string,Class>} AllClassesState
 */

/**
 * @param {AllClassesState} state
 * @param {*} action
 * @returns {AllClassesState}
 */
var allClassesReducer = function (state = initialState$5, action) {
  switch (action.type) {
    default:
      return state;
  }
};

const initialState$6 = {
  'race_human': {
    maxHp: 10
  },
  'race_elf': {
    maxHp: 10
  }
};

/**
 * @typedef {{maxHp:number}} Race
 * @typedef {Object.<string,Race>} AllRacesState
 */

/**
 * @param {AllRacesState} state
 * @param {*} action
 * @returns {AllRacesState}
 */
var allRacesReducer = function (state = initialState$6, action) {
  switch (action.type) {
    default:
      return state;
  }
};

const MESSAGE = 'MESSAGE';

/**
 * @typedef {{type: string, id:string, from: string, message: string}} MessageAction
 */

/**
 * @param {string} id
 * @param {string} from
 * @param {string} message
 * @returns {MessageAction}
 */


const initialState$7 = [];

/**
 * @typedef {{id:string, from: string, message: string}} Message
 * @typedef {Array.<Message>} MessagesState
 */

/**
 * @param {undefined | MessagesState} state
 * @param {MessageAction} action
 * @returns {* | MessagesState}
 */
function messagesReducer(state = initialState$7, action) {
  switch (action.type) {
    case MESSAGE:
      return state.concat({
        id: action.id,
        from: action.from,
        message: action.message
      });
    default:
      return state;
  }
}

const LOAD_STATE = 'LOAD_STATE';

/**
 * @param {{classes:Array}} state
 * @returns {Array}
 */


/**
 * @param {{races:Array}} state
 * @returns {Array}
 */


function loadStateAction(state) {
  return {
    type: LOAD_STATE,
    state: state
  };
}

/**
 * @param state
 * @param guid
 * @returns {Context}
 */
function getContext(state, guid) {
  return state.contexts[guid];
}

function rootReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_STATE:
      return action.state;
    default:
      return {
        messages: messagesReducer(state.messages, action),
        actions: allActionsReducer(state.actions, action),
        classes: allClassesReducer(state.classes, action),
        races: allRacesReducer(state.races, action),
        contexts: allContextsReducer(state.contexts, action)
      };
  }
}

function getClientGuid() {
  let authToken = localStorage.getItem('auth-token');
  if (!authToken) {
    authToken = guid();
    localStorage.setItem('auth-token', authToken);
  }
  return authToken;
}

function command({ dispatch, getState }) {
  const socket = io();

  return next => {
    socket.on('connect', function onConnect() {
      log.info('connected');
      socket.emit('authentication', getClientGuid());
    });

    socket.on('state_sync', state => {
      log.info('state_sync', state);
      next(loadStateAction(state));
    });

    socket.on('action', function onAction(action) {
      log.info('dispatched', JSON.stringify(action, undefined, 2));
      log.info('state before', getState());
      next(action);
      log.info('state after', getState());
    });

    return action => {
      const actionJSON = JSON.stringify(action);
      log.info(`Action: ${actionJSON}`);
      socket.emit('command_request', action);
      return {};
    };
  };
}

const stackViewMapping = {
  'setup:inputQuery': ([setupState, { query }], dispatch) => {
    let inputVal = '';
    return React.createElement(
      'div',
      null,
      React.createElement(
        'span',
        null,
        'Please provide your ',
        query
      ),
      React.createElement('input', { type: 'text', onChange: event => {
          inputVal = event.target.value;
        } }),
      React.createElement('input', { type: 'button', value: 'Send', onClick: () => {
          dispatch(queryResponseAction(inputVal));
        } })
    );
  }
};

function AppContainer({ clientStateName, stack, dispatch }) {
  const view = stackViewMapping[clientStateName] || (() => React.createElement(
    'div',
    null,
    'View: \'',
    clientStateName,
    '\' not found'
  ));
  return view(stack, dispatch);
}

const mapDispatchToProps = function (dispatch) {
  return { dispatch };
};

const mapStateToProps = function (state) {
  const stack = getStack(getContext(state, getClientGuid()));
  return {
    clientStateName: stack.map(state => state.name).join(':'),
    stack: stack
  };
};

var AppContainer$1 = reactRedux.connect(mapStateToProps, mapDispatchToProps)(AppContainer);

/*global __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
const store = redux.createStore(rootReducer, composeEnhancers(redux.applyMiddleware(command)));

ReactDOM.render(React.createElement(
  reactRedux.Provider,
  { store: store },
  React.createElement(AppContainer$1, null)
), document.getElementById('mount'));

}(React,ReactRedux,Redux,ReactDOM));
//# sourceMappingURL=bundle.js.map
