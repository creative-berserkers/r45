'use strict';

var express = require('express');
var path = require('path');
var http = require('http');
var socketIO = require('socket.io');
var fs = require('fs');
var minimatch = require('minimatch');
var redux = require('redux');

const winston = require('winston');
const path$1 = require('path');

const pwd$1 = process.env.PWD || process.cwd();

const logger = new winston.Logger({
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: path$1.join(pwd$1, 'data/server.log') })]
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

const SETUP = 'setup';

function createSetup() {
  return {
    name: SETUP
  };
}

//import rollDices from './roll-dices'
//import introduction from './introduction'
//import classSelection from './class-selection'
//import townLobby from './town-lobby'
//import assignDices from './assign-dices'
//import battle from './battle'

const PLAYER_NAME_SET = 'PLAYER_NAME_SET';
const CLASS_ID_SET = 'CLASS_ID_SET';
const RACE_ID_SET = 'RACE_ID_SET';
const STACK_PUSH = 'STACK_PUSH';
const STACK_POP = 'STACK_POP';


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
function getLastStackState(state) {
  return state.stack[state.stack.length - 1];
}

/**
 * @param {{stack:Array.<{name}>}} state
 */
function getLastStackStateName(state) {
  const lastStackState = getLastStackState(state);
  return lastStackState ? lastStackState.name : undefined;
}

/**
 * @param {{stack:Array.<{name}>}} state
 * @param {string} name
 * @returns {Object}
 */

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

/**
 * @typedef {{actions:Array.<string>}} Class
 * @typedef {Object.<string,Class>} AllClassesState
 */

/**
 * @param {AllClassesState} state
 * @param {*} action
 * @returns {AllClassesState}
 */

/**
 * @typedef {{maxHp:number}} Race
 * @typedef {Object.<string,Race>} AllRacesState
 */

/**
 * @param {AllRacesState} state
 * @param {*} action
 * @returns {AllRacesState}
 */

/**
 * @typedef {{type: string, id:string, from: string, message: string}} MessageAction
 */

/**
 * @param {string} id
 * @param {string} from
 * @param {string} message
 * @returns {MessageAction}
 */

const nextState = (id, data = {}) => {
  return Object.assign({ stateId: id }, data);
};

const path$2 = stack => {
  return stack.map(s => s.stateId).join('/');
};



const push = (stack, ...state) => {
  return [...stack, ...state];
};



const splitHead = stack => {
  return stack.length > 0 ? [stack.slice(0, stack.length - 1), stack[stack.length - 1]] : [[], undefined];
};



const match = (path$$1, query) => {
  return minimatch(path$$1, query);
};

const createStackReducer = reducersMap => (state = [], action) => {
  let prevState = undefined;
  let MAX_ITER = 99;
  let iter = 0;
  while (true) {
    if (prevState === state) return state;
    if (iter > MAX_ITER) throw Error('Max Iteration reached, probably loop');
    ++iter;
    prevState = state;
    state = Object.keys(reducersMap).reduce((acc, query) => match(path$2(state), query) ? reducersMap[query](acc, action) : acc, state);
  }
};

const playerSetupReducer = createStackReducer({});

const PLAYER_JOIN = 'PLAYER_JOIN';


const PLAYER_ACTION = 'PLAYER_ACTION';




const gameReducer = createStackReducer({
  '': (stack, action) => push(stack, nextState('join'), { players: {} }),

  'join': (stack, action) => {
    switch (action.type) {
      case PLAYER_JOIN:
        {
          const [tail, head$$1] = splitHead(stack);
          return [...tail, Object.assign({}, head$$1, { players: Object.assign({}, head$$1.players, { [action.playerId]: [] }) })];
        }
      case PLAYER_ACTION:
        {
          const [tail, head$$1] = splitHead(stack);
          return [...tail, Object.assign({}, head$$1, {
            players: Object.assign({}, head$$1.players, {
              [action.playerId]: playerSetupReducer(head$$1.players[action.playerId], action.wrappedAction)
            })
          })];
        }
      case 'GAME_START':
        {
          const [tail, head$$1] = splitHead(stack);
          return [...tail, nextState('play', { players: head$$1.players })];
        }
      default:
        return stack;
    }
  },

  'play': (stack, action) => {}
});

/**
 * @param {{classes:Array}} state
 * @returns {Array}
 */
const LOAD_STATE = 'LOAD_STATE';

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
        stack: gameReducer(state.stack, action)
        //messages: messagesReducer(state.messages, action),
        //actions: allActionsReducer(state.actions, action),
        //classes: allClassesReducer(state.classes, action),
        //races: allRacesReducer(state.races, action),
        //contexts: allContextsReducer(state.contexts, action)
      };
  }
}

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

const BATTLE = 'BATTLE';

var setup = {
  onEnter: (getState, dispatch, next, { guid }) => {
    dispatch(contextAction(guid, pushClientStateAction(INPUT_QUERY, createInputQuery({ id: 'name', query: 'Name?' }))));
  },
  onReturn: (getState, dispatch, next, { fromState, guid, returnState }) => {
    const state = getState();
    if (fromState === 'name') {
      const allClasses = allClassesSelector(state);
      next(contextAction(guid, setPlayerNameAction(returnState)));
      dispatch(contextAction(guid, pushClientStateAction(LIST_QUERY, createListQuery({ id: 'class', query: 'Class?', options: allClasses }))));
    }
    if (fromState === 'class') {
      const allClasses = allClassesSelector(state);
      const allRaces = allRacesSelector(state);
      next(contextAction(guid, setPlayerClassIdAction(allClasses[returnState])));
      dispatch(contextAction(guid, pushClientStateAction(LIST_QUERY, createListQuery({ id: 'race', query: 'Race?', options: allRaces }))));
    }
    if (fromState === 'race') {
      const allRaces = allRacesSelector(state);
      next(contextAction(guid, setPlayerRaceIdAction(allRaces[returnState])));
      dispatch(contextAction(guid, pushClientStateAction(BATTLE, {})));
    }
  }
};

var init = {
  onEnter: (getState, dispatch, next, { guid }) => {
    next(contextAction(guid, loadStateAction(getState())));
    dispatch(contextAction(guid, pushClientStateAction(SETUP, createSetup())));
  },
  onReturn: (getState, dispatch, next, { fromState, guid, returnState }) => {
    //game ended
  }
};

//import introduction from './introduction'
//import classSelection from './class-selection'
//import townLobby from './town-lobby'
//import rollDices from './roll-dices'
//import assignDices from './assign-dices'
//import battle from './battle'


var clientStateHandlers = Object.freeze({
	init: init,
	inputQuery: inputQuery,
	listQuery: listQuery,
	setup: setup
});

function serverMiddleware({ getState, dispatch }) {
  return next => action => {
    if (action.type === CONTEXT_SPAWNED) {
      if (getStack(getContext(getState(), action.guid)).length === 0) {
        const result = next(action);
        clientStateHandlers['init'].onEnter(getState, dispatch, next, Object.assign({}, action, { fromState: 'none' }));
        return result;
      }
    }
    if (action.type === CONTEXT_ACTION) {
      switch (action.action.type) {
        case STACK_PUSH:
          {
            let fromState = undefined;
            if (getStack(getContext(getState(), action.guid)).length > 0) {
              fromState = getLastStackStateName(getContext(getState(), action.guid));
            }
            const result = next(action);
            const name = getLastStackStateName(getContext(getState(), action.guid));
            clientStateHandlers[name].onEnter(getState, dispatch, next, Object.assign({}, action, { fromState }));
            return result;
          }
        case STACK_POP:
          {
            const fromState = getLastStackState(getContext(getState(), action.guid));
            const result = next(action);
            const stack = getStack(getContext(getState(), action.guid));
            if (stack.length > 0) {
              const name = getLastStackStateName(getContext(getState(), action.guid));
              clientStateHandlers[name].onReturn(getState, dispatch, next, Object.assign({}, action.action, { fromState, guid: action.guid }));
            }
            return result;
          }
        default:
          {
            const name = getLastStackStateName(getContext(getState(), action.guid));
            const handler = clientStateHandlers[name];
            if (handler) {
              handler.onAction(getState, dispatch, next, action);
            } else {
              log.warn(`Couldn't find action handler '${name}' for processing:`, action);
            }
            return;
          }
      }
    }
  };
}

/**
 * Compares two object using Object.keys shallowly.
 *
 * @param {Object|undefined} oldState
 * @param {Object|undefined} newState
 * @returns {boolean} true if passed objects are shallowly equal, false otherwise
 */
function shallowEqual(oldState = {}, newState = {}) {
  const resultOldToNew = Object.keys(oldState).reduce((result, oldKey) => {
    return result === true ? result : oldState[oldKey] !== newState[oldKey];
  }, false);

  const resultNewToOld = Object.keys(newState).reduce((result, newKey) => {
    return result === true ? result : oldState[newKey] !== newState[newKey];
  }, false);

  return !resultNewToOld && !resultOldToNew;
}

function serverMiddleware$1(clientGuidToSocket, getControllerSocket, { getState }) {
  return next => action => {
    log.info(`Action ${JSON.stringify(action)}`);

    const stateBefore = getState();
    const result = next(action);
    const stateAfter = getState();

    const stateChanged = !shallowEqual(stateBefore, stateAfter);
    if (stateChanged) {
      Object.keys(stateAfter.contexts).forEach(key => {

        const targetSocket = clientGuidToSocket[key];
        if (targetSocket) {
          log.info(`Sending to ${key} action: ${JSON.stringify(action)}`);
          targetSocket.emit('action', action);
        } else {
          log.warn(`Client ${key} disconnected and is not receiving state changes`);
        }
      });
    }
    getControllerSocket().emit('state-action', {
      state: stateAfter,
      action: action
    });
    return result;
  };
}

const pwd$2 = process.env.PWD || process.cwd();

const dataDirPath = path.join(pwd$2, 'data');
const stateFilePath = path.join(pwd$2, 'data/state.json');

const clientSocketIdToGuid = {};
const clientGuidToSocket = {};

let controllerSocket = undefined;

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
const store = redux.createStore(rootReducer, JSON.parse(stateStr), redux.applyMiddleware(serverMiddleware, serverMiddleware$1.bind(undefined, clientGuidToSocket, () => controllerSocket)));

store.subscribe(function persistState() {
  const currentState = store.getState();
  if (currentState === undefined) {
    log.warn('Saving empty state.');
  } else {
    try {
      fs.writeFileSync(stateFilePath, JSON.stringify(currentState, null, 2));
      log.info('State Saved to', stateFilePath);
    } catch (e) {
      log.error('Error while saving state', e.message);
    }
  }
});

function onSocket(io, socket) {
  const ipAddress = socket.request.connection.remoteAddress;
  const clientId = `${ipAddress}`;
  log.info(`client ??@${clientId} connected`);

  socket.on('authentication', function (guid) {
    clientSocketIdToGuid[socket.id] = guid;
    clientGuidToSocket[guid] = socket;
    log.info(`client ??@${clientId} authenticated as ${guid}`);
    socket.emit('state_sync', store.getState());
    store.dispatch(contextSpawnedAction(guid));
  });

  socket.on('disconnect', function () {
    const guid = clientSocketIdToGuid[socket.id];
    log.info(`client ${guid}@${clientId} disconnected`);
    store.dispatch(contextDespawnedAction(guid));
    clientGuidToSocket[guid] = undefined;
    clientSocketIdToGuid[socket.id] = undefined;
  });

  socket.on('command_request', function (action) {
    const guid = clientSocketIdToGuid[socket.id];
    log.info(`client ${guid}@${clientId} action: ${JSON.stringify(action)}`);
    store.dispatch(contextAction(guid, action));
  });

  socket.on('controller-connect', () => {
    controllerSocket = socket;
    controllerSocket.emit('state-sync', store.getState());
  });
}

//import 'source-map-support/register'
const app = express();
const host = '0.0.0.0';
const port = process.env.PORT || 8080;

const pwd = process.env.PWD || process.cwd();

app.use('/public', express.static(path.join(pwd, 'public')));

app.get('/favicon.ico', function (req, res) {
  res.sendFile(path.join(pwd, 'public/favicon.ico'));
});

app.get('/controller', function (req, res) {
  res.sendFile(path.join(pwd, 'public/controller.html'));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(pwd, 'public/index.html'));
});

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', onSocket.bind(undefined, io));

server.listen(port, host, function (err) {
  if (err) log.error(err);else {
    log.info(`Listening at http://${host}:${port}`);
  }
});
//# sourceMappingURL=server.bundle.js.map
