'use strict';

var express = require('express');
var path = require('path');
var http = require('http');
var socketIO = require('socket.io');
var fs = require('fs');
var redux = require('redux');

const winston = require('winston');
const path$1 = require('path');

const logger = new winston.Logger({
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: path$1.join(__dirname, 'data/server.log') })]
});

var log = {
  debug(...args) {
    logger.debug(...args);
  },
  info(...args) {
    logger.info(...args);
  },
  warn(...args) {
    logger.warn(...args);
  },
  error(...args) {
    logger.error(...args);
  }
};

const INPUT_QUERY = 'inputQuery';

const QUERY_RESPONSE = 'INPUT_QUERY:QUERY_RESPONSE';

/**
 * @typedef {{type: string, message: string}} ResponseAction
 */

/**
 * @param {string} message
 * @returns ResponseAction
 */


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

const LIST_QUERY_RESPONSE = 'LIST_QUERY:LIST_QUERY_RESPONSE';

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
function optionsSelector(state) {
  return state.options;
}

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
function setPlayerNameAction(playerName) {
  return {
    type: PLAYER_NAME_SET,
    playerName: playerName
  };
}

/**
 * @typedef {{type: string, classId: string}} PlayerClassIdAction
 */

/**
 * @param {string} classId
 * @returns PlayerClassIdAction
 */
function setPlayerClassIdAction(classId) {
  return {
    type: CLASS_ID_SET,
    classId: classId
  };
}

/**
 * @typedef {{type: string, raceId: string}} PlayerRaceIdAction
 */

/**
 * @param {string} raceId
 * @returns PlayerRaceIdAction
 */
function setPlayerRaceIdAction(raceId) {
  return {
    type: RACE_ID_SET,
    raceId: raceId
  };
}

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
function pushClientStateAction(name, initialState) {
  return {
    type: STACK_PUSH,
    name: name,
    initialState: initialState
  };
}

function popClientStateAction(returnState) {
  return {
    type: STACK_POP,
    returnState: returnState
  };
}

/**
 * @param {{classId:string}} state
 * @returns {string}
 */


/**
 * @param {{stack:Array}} state
 * @returns {Array}
 */


/**
 * @param {{playerName:string}} state
 * @returns {string}
 */


/**
 * @param {{stack:Array}} state
 * @returns {Object}
 */
function getLastStackState(state) {
  return state.stack[state.stack.length - 1];
}

/**
 * @param {{stack:Array.<{name}>}} state
 */
function getLastStackStateName(state) {
  return getLastStackState(state).name;
}

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
        stack: state.stack.slice(0, state.length - 1)
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
        return;
      }
    default:
      return state;
  }
}

const CONTEXT_SPAWNED = 'CONTEXT_SPAWNED';
const CONTEXT_DESPAWNED = 'CONTEXT_DESPAWNED';
const CONTEXT_ACTION = 'CONTEXT_ACTION';

function contextAction(guid, action) {
  return {
    type: CONTEXT_ACTION,
    guid: guid,
    action: action
  };
}

/**
 * @param {string} guid
 * @returns {{type: string, guid: string|undefined}}
 */
function contextSpawnedAction(guid) {
  return {
    type: CONTEXT_SPAWNED,
    guid: guid
  };
}

function contextDespawnedAction(guid) {
  return {
    type: CONTEXT_DESPAWNED,
    guid: guid
  };
}

function getContext(state, guid) {
  return state.contexts[guid];
}

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

var inputQuery = {
  onEnter: (getState, dispatch, next, { guid }) => {},
  onAction: (getState, dispatch, next, { action, guid }) => {
    switch (action.type) {
      case QUERY_RESPONSE:
        {
          next(contextAction(guid, action));
          dispatch(contextAction(guid, popClientStateAction(action.message)));
        }
    }
  }
};

var listQuery = {
  onAction: (getState, dispatch, next, { action, guid }) => {
    switch (action.type) {
      case LIST_QUERY_RESPONSE:
        {
          const state = getState();
          const options = optionsSelector(getLastStackState(getContext(state, guid)));
          if (action.option >= 0 && action.option < options.length) {
            next(contextAction(guid, action));
            dispatch(contextAction(guid, popClientStateAction(options[action.option])));
          }
        }
    }
  }
};

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
function allClassesSelector(state) {
  return state.classes;
}

/**
 * @param {{races:Array}} state
 * @returns {Array}
 */
function allRacesSelector(state) {
  return state.races;
}



function rootReducer(state = {}, action) {
  switch (action) {
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

const BATTLE = 'BATTLE';

var setup = {
  onEnter: (getState, dispatch, next, { guid }) => {
    dispatch(contextAction(guid, pushClientStateAction(INPUT_QUERY, createInputQuery({ id: 'name', query: 'Name?' }))));
  },
  onReturn: (getState, dispatch, next, { fromState, guid, returnState }) => {
    const state = getState();
    if (fromState.id === 'name') {
      const allClasses = allClassesSelector(state);
      next(contextAction(guid, setPlayerNameAction(returnState)));
      dispatch(contextAction(guid, pushClientStateAction(LIST_QUERY, createListQuery({ id: 'class', query: 'Class?', options: allClasses }))));
    }
    if (fromState.id === 'class') {
      const allClasses = allClassesSelector(state);
      const allRaces = allRacesSelector(state);
      next(contextAction(guid, setPlayerClassIdAction(allClasses[returnState])));
      dispatch(contextAction(guid, pushClientStateAction(LIST_QUERY, createListQuery({ id: 'race', query: 'Race?', options: allRaces }))));
    }
    if (fromState.id === 'race') {
      const allRaces = allRacesSelector(state);
      next(contextAction(guid, setPlayerRaceIdAction(allRaces[returnState])));
      dispatch(contextAction(guid, pushClientStateAction(BATTLE, {})));
    }
  }
};

//import introduction from './introduction'
//import classSelection from './class-selection'
//import townLobby from './town-lobby'
//import rollDices from './roll-dices'
//import assignDices from './assign-dices'
//import battle from './battle'


var clientStateHandlers = Object.freeze({
	inputQuery: inputQuery,
	listQuery: listQuery,
	setup: setup
});

function serverMiddleware({ getState, dispatch }) {
  return next => action => {
    if (action.type === CONTEXT_SPAWNED) {
      const result = next(action);
      if (getContext(getState(), action.guid).length === 0) {
        dispatch(contextAction(action.guid, pushClientStateAction(SETUP, {})));
      }
      return result;
    }
    if (action.type === CONTEXT_ACTION) {
      switch (action.action.type) {
        case STACK_PUSH:
          {
            let fromState = undefined;
            if (getContext(getState(), action.guid).length > 0) {
              fromState = getLastStackStateName(getContext(getState(), action.guid));
            }
            const result = next(action.action);
            const name = getLastStackStateName(getContext(getState(), action.guid));
            clientStateHandlers[name].onEnter(getState, dispatch, next, Object.assign({}, action, { fromState }));
            return result;
          }
        case STACK_POP:
          {
            const fromState = getLastStackStateName(getContext(getState(), action.guid));
            const result = next(action.action);
            if (getContext(getState(), action.guid).length > 0) {
              const name = getLastStackStateName(getContext(getState(), action.guid));
              clientStateHandlers[name].onReturn(getState, dispatch, next, Object.assign({}, action, { fromState }));
            }
            return result;
          }
        default:
          {
            const name = getLastStackStateName(getContext(getState(), action.guid));
            return clientStateHandlers[name].onAction(getState, dispatch, next, action);
          }
      }
    } else {
      return next(action);
    }
  };
}

function shallowEqual(oldState, newState) {
  const resultOldToNew = Object.keys(oldState).reduce((result, oldKey) => {
    return result === true ? result : oldState[oldKey] !== newState[oldKey];
  }, false);

  const resultNewToOld = Object.keys(newState).reduce((result, newKey) => {
    return result === true ? result : oldState[newKey] !== newState[newKey];
  }, false);

  return !resultNewToOld && !resultOldToNew;
}

function serverMiddleware$1(clientGuidToSocket, { getState }) {
  return next => action => {
    log.info(`Action ${ JSON.stringify(action) }`);

    const stateBefore = getState();
    const result = next(action);
    const stateAfter = getState();

    Object.keys(stateAfter.contexts).forEach(key => {

      const clientStateBefore = getContext(stateBefore, key);
      const clientStateAfter = getContext(stateAfter, key);

      const stateChanged = !shallowEqual(clientStateBefore, clientStateAfter);
      const targetSocket = clientGuidToSocket[key];
      if (stateChanged && targetSocket) {
        log.info(`Sending to ${ key }`);
        targetSocket.emit('action', action);
      }

      if (!targetSocket) {
        log.warn(`Client ${ key } disconnected and is not receiving state changes`);
      }
    });
    return result;
  };
}

const dataDirPath = path.join(__dirname, 'data');
const stateFilePath = path.join(__dirname, 'data/state.json');

const clientSocketIdToGuid = {};
const clientGuidToSocket = {};

if (!fs.existsSync(dataDirPath)) {
  fs.mkdirSync(dataDirPath);
}
let stateStr = '{}';
try {
  stateStr = fs.readFileSync(stateFilePath, 'utf8');
} catch (e) {
  fs.writeFileSync(stateFilePath, '{}', { flag: 'wx' });
}

if (stateStr.trim().length === 0) stateStr = '{}';
const store = redux.createStore(rootReducer, JSON.parse(stateStr), redux.applyMiddleware(serverMiddleware, serverMiddleware$1.bind(undefined, clientGuidToSocket)));

store.subscribe(function persistState() {
  const currentState = store.getState();
  if (currentState === undefined) {
    log.warn('Saving empty state.');
  } else {
    fs.writeFileSync(stateFilePath, JSON.stringify(currentState, null, 2));
  }
});

function onSocket(io, socket) {
  const ipAddress = socket.request.connection.remoteAddress;
  const clientId = `${ ipAddress }`;
  log.info(`client ??@${ clientId } connected`);

  socket.on('authentication', function (authToken) {
    clientSocketIdToGuid[socket.id] = authToken;
    clientGuidToSocket[authToken] = socket;
    log.info(`client ??@${ clientId } authenticated as ${ authToken }`);
    store.dispatch(contextSpawnedAction(authToken));
    socket.emit('initial_state', store.getState());
  });

  socket.on('disconnect', function () {
    const guid = clientSocketIdToGuid[socket.id];
    log.info(`client ${ guid }@${ clientId } disconnected`);
    store.dispatch(contextDespawnedAction(guid));
    clientGuidToSocket[guid] = undefined;
    clientSocketIdToGuid[socket.id] = undefined;
  });

  socket.on('command_request', function (action) {
    const guid = clientSocketIdToGuid[socket.id];
    log.info(`client ${ guid }@${ clientId } action: ${ JSON.stringify(action) }`);
    store.dispatch(contextAction(guid, action));
  });
}

const app = express();
const host = '0.0.0.0';
const port = process.env.PORT || 8080;

process.env.PWD = process.cwd();

app.use('/public', express.static(path.join(process.env.PWD, 'public')));

app.get('/favicon.ico', function (req, res) {
  res.sendFile(path.join(process.env.PWD, 'public/favicon.ico'));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(process.env.PWD, 'public/index.html'));
});

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', onSocket.bind(undefined, io));

server.listen(port, host, function (err) {
  if (err) log.error(err);else {
    log.info(`Listening at http://${ host }:${ port }`);
  }
});
//# sourceMappingURL=server.bundle.js.map
