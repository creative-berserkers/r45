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

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function guid() {

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
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

function changed(oldState, newState) {

  return shallowEqual(oldState, newState) ? oldState : newState;
}

const STATE_NAME = 'chat';

const MESSAGE = 'CHAT:MESSAGE';
const SET_PLAYER_NAME = 'CHAT:PLAYER_NAME_SET';

/**
 *
 * @param {string} to
 * @param {string} message
 * @param {string} from
 * @returns {{type: string, id:string, from: string, guid: string|undefined, to: string, message: string}}
 */
function messageAction(to, message, from) {
  return {
    type: MESSAGE,
    id: guid(),
    from: from,
    guid: to !== 'all' ? to : undefined,
    to: to,
    message: message
  };
}

function setPlayerNameAction(playerName, guid$$1) {
  return {
    type: SET_PLAYER_NAME,
    guid: guid$$1,
    playerName: playerName
  };
}



const initialState$1 = {
  name: STATE_NAME,
  playerName: 'Noname',
  messages: []
};

function introduction(state = initialState$1, action) {
  switch (action.type) {
    case MESSAGE:
      return Object.assign({}, state, {
        messages: state.messages.concat({
          id: action.id,
          from: action.from,
          to: action.to,
          message: action.message
        })
      });
    case SET_PLAYER_NAME:
      return Object.assign({}, state, {
        playerName: action.playerName
      });
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


var clientStateReducers = Object.freeze({
	chat: introduction
});

const CLIENT_STATE_LOAD = 'CLIENT_STATE_LOAD';
const CLIENT_STATE_PUSH = 'CLIENT_STATE_PUSH';
const CLIENT_STATE_POP = 'CLIENT_STATE_POP';

function pushClientStateAction(name, initialState, guid) {
  return {
    type: CLIENT_STATE_PUSH,
    guid: guid,
    name: name,
    initialState: initialState
  };
}





function currentClientStateSelector(state) {
  return state[state.length - 1];
}

function currentClientStateNameSelector(state) {
  return currentClientStateSelector(state).name;
}



function contextReducer(state = [], action) {
  switch (action.type) {
    case CLIENT_STATE_LOAD:
      return action.state;
    case CLIENT_STATE_PUSH:
      return state.concat(clientStateReducers[action.name](undefined, action));
    case CLIENT_STATE_POP:
      return state.slice(0, state.length - 1);
    default:
      {
        if (state.length === 0) return state;
        const newState = state.map(s => clientStateReducers[s.name](s, action));
        return newState.find((s, index) => state[index] !== s) === undefined ? state : newState;
      }
  }
}

const CLIENT_SPAWNED = 'CLIENT_SPAWNED';
const CLIENT_DESPAWNED = 'CLIENT_DESPAWNED';
const ACTION_REQUEST = 'ACTION_REQUEST';

function clientSpawnedAction(guid$$1) {
  return {
    type: CLIENT_SPAWNED,
    guid: guid$$1
  };
}

function clientDespawnedAction(guid$$1) {
  return {
    type: CLIENT_DESPAWNED,
    guid: guid$$1
  };
}

function actionRequest(action, guid$$1) {
  return {
    type: ACTION_REQUEST,
    guid: guid$$1,
    action: action
  };
}

function clientSelector(state, guid$$1) {
  return state.contexts[guid$$1].shared;
}



const initialState = {
  connected: false,
  shared: contextReducer(undefined, { type: '@INIT@' })
};

function clientContextReducer(state = initialState, action) {
  switch (action.type) {
    case CLIENT_SPAWNED:
      return {
        shared: contextReducer(state.shared, action),
        connected: true
      };
    case CLIENT_DESPAWNED:
      return {
        shared: contextReducer(state.shared, action),
        connected: false
      };
    default:
      return changed(state, Object.assign({}, state, {
        shared: contextReducer(state.shared, action)
      }));
  }
}

function allContextsReducer(state = {}, action) {
  switch (action.type) {
    case CLIENT_SPAWNED:
      return Object.assign({}, state, { [action.guid]: clientContextReducer(state[action.guid], action) });
    case CLIENT_DESPAWNED:
      return Object.assign({}, state, { [action.guid]: clientContextReducer(state[action.guid], action) });
    default:
      return changed(state, Object.keys(state).reduce((newState, context) => {
        if (action.guid) {
          if (!context) throw Error('Should not be null');
          if (action.guid === context) {
            newState[context] = clientContextReducer(state[context], action);
          } else {
            newState[context] = state[context];
          }
        } else {
          newState[context] = clientContextReducer(state[context], action);
        }

        return newState;
      }, {}));
  }
}

var globalReducer = redux.combineReducers({
  contexts: allContextsReducer
});

const GM = 'GM';

var battle = {
  onEnter: (guid, getState, dispatch) => {
    dispatch(messageAction(GM, guid, 'You are entering battle.'));
    dispatch(pushClientStateAction('rollDices', guid));
  },
  onReturn: (guid, getState, dispatch, fromState, returnedState) => {
    log.info(`${ guid } Return from state: `, fromState, returnedState);
    if (fromState === 'rollDices') {
      dispatch(pushClientStateAction('assignDices', {
        rolledDices: returnedState.rolledDices
      }, guid));
    }
  },
  onCommand: (guid, getState, dispatch, command) => {
    //const state = getState()

  }
};

const STATE_NAME$1 = 'setup';

function onMessage(getState, dispatch, action) {
  if (currentClientStateNameSelector(getState()) === STATE_NAME) {
    dispatch(setPlayerNameAction(action.message, action.guid));
    dispatch(pushClientStateAction(STATE_NAME$1, {}, action.guid));
  } else {
    dispatch(action);
  }
}

var chat = {
  onEnter: (getState, dispatch, action) => {
    dispatch(messageAction(action.guid, 'Name?', 'Chat System'));
  },
  onAction: (getState, dispatch, action) => {
    switch (action.type) {
      case MESSAGE:
        return onMessage(getState, dispatch, action);
    }
  }
};

//import introduction from './introduction'
//import classSelection from './class-selection'
//import townLobby from './town-lobby'
//import rollDices from './roll-dices'
//import assignDices from './assign-dices'


var clientStateHandlers = Object.freeze({
	battle: battle,
	chat: chat
});

function serverMiddleware({ getState, dispatch }) {
  return next => action => {
    if (action.type === CLIENT_SPAWNED) {
      const result = next(action);
      if (clientSelector(getState(), action.guid).length === 0) {
        dispatch(pushClientStateAction(STATE_NAME, {}, action.guid));
      }
      return result;
    } else if (action.type === CLIENT_STATE_PUSH) {
      const result = next(action);
      if (clientSelector(getState(), action.guid).length > 0) {
        const name = currentClientStateNameSelector(clientSelector(getState(), action.guid));
        log.info(`${ action.guid } entering state ${ name }`);
        if (clientStateHandlers[name].onEnter) {
          clientStateHandlers[name].onEnter(getState, dispatch, action);
        }
      }
      return result;
    } else if (action.type === CLIENT_STATE_POP) {
      const fromStateName = currentClientStateNameSelector(clientSelector(getState(), action.guid));
      const result = next(action);
      if (clientSelector(getState(), action.guid).length > 0) {
        const name = currentClientStateNameSelector(clientSelector(getState(), action.guid));
        log.info(`${ action.guid } returning from ${ fromStateName } state  to ${ name } state`);
        if (clientStateHandlers[name].onReturn) {
          clientStateHandlers[name].onReturn(getState, dispatch, action, fromStateName);
        }
      }
      return result;
    } else if (action.type === ACTION_REQUEST) {
      if (clientSelector(getState(), action.guid).length > 0) {
        const name = currentClientStateNameSelector(clientSelector(getState(), action.guid));
        clientStateHandlers[name].onAction(getState, dispatch, action);
      }
    } else {
      return next(action);
    }
  };
}

function serverMiddleware$1(clientGuidToSocket, { getState }) {
  return next => action => {
    log.info(`Action ${ JSON.stringify(action) }`);

    const stateBefore = getState();
    const result = next(action);
    const stateAfter = getState();

    Object.keys(stateAfter.contexts).forEach(key => {

      const clientStateBefore = clientSelector(stateBefore, key);
      const clientStateAfter = clientSelector(stateAfter, key);

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
const store = redux.createStore(globalReducer, JSON.parse(stateStr), redux.applyMiddleware(serverMiddleware, serverMiddleware$1.bind(undefined, clientGuidToSocket)));

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
    store.dispatch(clientSpawnedAction(authToken));
    socket.emit('initial_state', store.getState().contexts[authToken].shared);
  });

  socket.on('disconnect', function () {
    const guid = clientSocketIdToGuid[socket.id];
    log.info(`client ${ guid }@${ clientId } disconnected`);
    store.dispatch(clientDespawnedAction(guid));
    clientGuidToSocket[guid] = undefined;
    clientSocketIdToGuid[socket.id] = undefined;
  });

  socket.on('command_request', function (action) {
    const guid = clientSocketIdToGuid[socket.id];
    log.info(`client ${ guid }@${ clientId } action: ${ JSON.stringify(action) }`);
    store.dispatch(actionRequest(Object.assign({}, action, { guid }), guid));
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
