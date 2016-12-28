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

const initialState$1 = {
  actionState: [],
  messages: [{
    id: guid(),
    from: 'Chat System',
    to: 'all',
    message: 'Welcome to chat'
  }]
};

function contextReducer(state = initialState$1, action) {
  switch (action.type) {
    case 'CLIENT_STATE_ENTER_PUSH':
      return Object.assign({}, state, {
        actionState: state.actionState.concat(action.name)
      });
    case 'CLIENT_STATE_ENTER_REPLACE':
      return Object.assign({}, state, {
        actionState: state.actionState.slice(0, state.actionState.length - 1).concat(action.name)
      });
    case 'SAY':
      return Object.assign({}, state, {
        messages: state.messages.concat({
          id: action.id,
          from: action.from,
          to: action.to,
          message: action.message
        })
      });
    case 'LOAD_CLIENT_STATE':
      return action.state;
    default:
      return state;
  }
}

const initialState = {
  connected: false,
  shared: contextReducer(undefined, { type: '@INIT@' })
};

function clientContextReducer(state = initialState, action) {
  switch (action.type) {
    case 'CONTEXT_SPAWNED':
      return {
        shared: contextReducer(state.shared, action),
        connected: true
      };
    case 'CONTEXT_DESPAWNED':
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
    case 'CONTEXT_SPAWNED':
      return Object.assign({}, state, { [action.guid]: clientContextReducer(state[action.guid], action) });
    case 'CONTEXT_DESPAWNED':
      return Object.assign({}, state, { [action.guid]: clientContextReducer(state[action.guid], action) });
    default:
      return changed(state, Object.keys(state).reduce((newState, context) => {
        newState[context] = clientContextReducer(state[context], action);
        return newState;
      }, {}));
  }
}

var globalReducer = redux.combineReducers({
  contexts: allContextsReducer
});

var introduction = {
  onEnter: (guid, state, dispatch) => {
    log.info('entering state INTRODUCTION');
  },
  onLeave: (guid, state, dispatch) => {
    log.info('leaving state INTRODUCTION');
  },
  onCommand: (guid, state, dispatch, command) => {
    log.info(`in state INTRODUCTION guid:${ guid } command:${ command }`);
  }
};



var actionStateHandlers = Object.freeze({
	introduction: introduction
});

function serverMiddleware({ getState, dispatch }) {
  return next => action => {
    if (action.type === 'CONTEXT_SPAWNED') {
      if (getState().contexts[action.guid].shared.actionState.length === 0) {
        dispatch({
          type: 'CLIENT_STATE_ENTER_PUSH',
          guid: action.guid,
          name: 'introduction'
        });
      }
    } else if (action.type === 'CLIENT_STATE_ENTER_PUSH' || action.type === 'CLIENT_STATE_ENTER_REPLACE') {
      const prevActionState = getState().contexts[action.guid].shared.actionState;
      if (prevActionState.length > 0) {
        const name = prevActionState[prevActionState.length - 1];
        actionStateHandlers[name].onLeave(action.guid, getState(), dispatch);
      }
      const result = next(action);
      const currActionState = getState().contexts[action.guid].shared.actionState;
      if (currActionState.length > 0) {
        const name = currActionState[currActionState.length - 1];
        actionStateHandlers[name].onEnter(action.guid, getState(), dispatch);
      }
      return result;
    } else if (action.type === 'COMMAND_REQUEST') {
      const currActionState = getState().contexts[action.guid].shared.actionState;
      if (currActionState.length > 0) {
        const name = currActionState[currActionState.length - 1];
        actionStateHandlers[name].onCommand(action.guid, getState(), dispatch, action.command);
      }
    } else {
      return next(action);
    }
  };
}

function serverMiddleware$1(clientGuidToSocket, { getState, dispatch }) {
  return next => action => {
    log.info(`Action ${ JSON.stringify(action) }`);
    const stateBeforeRequest = getState();
    const result = next(action);
    const stateAfterRequest = getState();
    Object.keys(stateBeforeRequest.contexts).forEach(key => {

      const stateChanged = !shallowEqual(stateBeforeRequest.contexts[key].shared, stateAfterRequest.contexts[key].shared);
      const targetSocket = clientGuidToSocket[key];
      if (stateChanged) {
        log.info(`After ${ action.type } state for ${ key } changed, sending action`);
        targetSocket.emit('action', action);
      } else {
        log.info(`After ${ action.type } state for ${ key } is same`);
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
  fs.writeFile(stateFilePath, JSON.stringify(currentState, null, 2), function (err) {
    if (err) {
      return log.error(err);
    }
  });
});

function onSocket(io, socket) {
  const ipAddress = socket.request.connection.remoteAddress;
  const clientId = `${ ipAddress }`;
  log.info(`client ??@${ clientId } connected`);

  socket.on('authentication', function (authToken) {
    clientSocketIdToGuid[socket.id] = authToken;
    clientGuidToSocket[authToken] = socket;
    log.info(`client ??@${ clientId } authenticated as ${ authToken }`);
    store.dispatch({
      type: 'CONTEXT_SPAWNED',
      guid: authToken
    });
    socket.emit('initial_state', store.getState().contexts[authToken].shared);
  });

  socket.on('disconnect', function () {
    log.info(`client ${ clientSocketIdToGuid[socket.id] }@${ clientId } disconnected`);
    store.dispatch({
      type: 'CONTEXT_DESPAWNED',
      guid: clientSocketIdToGuid[socket.id]
    });
    clientGuidToSocket[clientSocketIdToGuid[socket.id]] = undefined;
    clientSocketIdToGuid[socket.id] = undefined;
  });

  socket.on('command_request', function (action) {
    if (action.type !== 'COMMAND_REQUEST') return;
    log.info(`client ${ clientSocketIdToGuid[socket.id] }@${ clientId } command:${ JSON.stringify(action.command) }`);
    store.dispatch({
      type: action.type,
      guid: clientSocketIdToGuid[socket.id],
      command: action.command
    });
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
