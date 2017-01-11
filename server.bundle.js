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

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
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

function filterFirst(array, element) {
  let found = false;
  let newArray = [];
  array.forEach(el => {
    if (el != element || found) {
      newArray.push(el);
    } else {
      found = true;
    }
  });
  return newArray;
}

const ROLL = 'ROLL_DICES:ROLL';
const LOCK = 'ROLL_DICES:LOCK';

function rollAction(guid, rolledDices) {
  return {
    type: ROLL,
    guid: guid,
    rolledDices: rolledDices
  };
}
function lockAction(guid, locks) {
  return {
    type: LOCK,
    guid: guid,
    locks: locks
  };
}

function numberOfRerollsSelector(state) {
  return state.numberOfRolls;
}

function rolledDicesSelector(state) {
  return state.rolledDices;
}

function locksSelector(state) {
  return state.locks;
}

const initialState$2 = {
  name: 'rollDices',
  rolledDices: [],
  locks: [],
  numberOfRolls: 0
};

function rollDices(state = initialState$2, action) {
  switch (action.type) {
    case ROLL:
      return Object.assign({}, state, {
        rolledDices: action.rolledDices,
        numberOfRolls: state.numberOfRolls + 1
      });
    case LOCK:
      return Object.assign({}, state, {
        locks: action.locks
      });
    default:
      return state;
  }
}

const initialState$3 = {
  name: 'introduction'
};

function introduction(state = initialState$3, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const initialState$4 = {
  name: 'classSelection'
};

function classSelection(state = initialState$4, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const initialState$5 = {
  name: 'townLobby'
};

function townLobby(state = initialState$5, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const CLIENT_STATE_ENTER_PUSH$1 = 'CLIENT_STATE_ENTER_PUSH';
const ASSIGN_DICE = 'ASSIGN_DICES:ASSIGN_DICE';
const RESET = 'ASSIGN_DICES:RESET';



function currentDicesSelector(state) {
  return state.currentDices;
}

function assignedActionsSelector(state) {
  return state.actions;
}

function slotsReducer(state = [], action) {
  switch (action.type) {
    case ASSIGN_DICE:
      {
        const newArray = state.slice(0);
        newArray[action.slotIndex] = action.dice;
        return newArray;
      }
    default:
      return state;
  }
}

function actionsReducer(state = [], action) {
  switch (action.type) {
    case ASSIGN_DICE:
      {
        const newArray = state.slice(0);
        newArray[action.actionIndex] = slotsReducer(state[action.actionIndex], action);
        return newArray;
      }
    default:
      return state;
  }
}

function assignDiceAction(guid$$1, actionIndex, slotIndex, dice) {
  return {
    type: ASSIGN_DICE,
    guid: guid$$1,
    actionIndex: actionIndex,
    slotIndex: slotIndex,
    dice: dice
  };
}

function resetAction(guid$$1) {
  return {
    type: RESET,
    guid: guid$$1
  };
}

const initialState$6 = {
  name: 'assignDices',
  rolledDices: [],
  currentDices: [],
  actions: []
};
function assignDices(state = initialState$6, action) {
  switch (action.type) {
    case CLIENT_STATE_ENTER_PUSH$1:
      return Object.assign({}, state, {
        rolledDices: action.initialState.rolledDices,
        currentDices: action.initialState.rolledDices
      });
    case ASSIGN_DICE:
      return Object.assign({}, state, {
        actions: actionsReducer(state.actions, action),
        currentDices: filterFirst(state.currentDices, action.dice)
      });
    case RESET:
      return Object.assign({}, state, {
        currentDices: state.rolledDices,
        actions: []
      });

    default:
      return state;
  }
}

const initialState$7 = {
  name: 'battle',
  battlefield: [{
    id: 'group1',
    unitrefs: ['orc1', 'orc2']
  }, {
    id: 'group2',
    unitrefs: ['orc3', 'goblin1', 'goblin2']
  }, {
    id: 'group3',
    unitrefs: []
  }],
  units: {
    'orc1': {
      hp: {
        current: 10,
        max: 10
      }
    },
    'orc2': {
      hp: {
        current: 10,
        max: 10
      }
    },
    'orc3': {
      hp: {
        current: 10,
        max: 10
      }
    },
    'goblin1': {
      hp: {
        current: 10,
        max: 10
      }
    },
    'goblin2': {
      hp: {
        current: 10,
        max: 10
      }
    }
  }
};

function battle(state = initialState$7, action) {
  switch (action.type) {
    default:
      return state;
  }
}



var clientActionReducers = Object.freeze({
	rollDices: rollDices,
	introduction: introduction,
	classSelection: classSelection,
	townLobby: townLobby,
	assignDices: assignDices,
	battle: battle
});

const CLIENT_STATE_ENTER_PUSH = 'CLIENT_STATE_ENTER_PUSH';
const CLIENT_STATE_POP = 'CLIENT_STATE_POP';
const CLIENT_STATE_ENTER_REPLACE = 'CLIENT_STATE_ENTER_REPLACE';

function pushStateAction(guid$$1, name, initialState) {
  return {
    type: CLIENT_STATE_ENTER_PUSH,
    guid: guid$$1,
    name: name,
    initialState: initialState
  };
}

function popStateAction(guid$$1) {
  return {
    type: CLIENT_STATE_POP,
    guid: guid$$1
  };
}

function setStateAction(guid$$1, name) {
  return {
    type: CLIENT_STATE_ENTER_REPLACE,
    guid: guid$$1,
    name: name
  };
}

function actionStateReducer(state = [], action) {
  switch (action.type) {
    case CLIENT_STATE_ENTER_PUSH:
      return state.concat(clientActionReducers[action.name](undefined, action));
    case CLIENT_STATE_POP:
      return state.slice(0, state.length - 1);
    case CLIENT_STATE_ENTER_REPLACE:
      return state.slice(0, state.length - 1).concat(clientActionReducers[action.name](undefined, { type: '@INIT@' }));
    default:
      {
        if (state.length === 0) return state;
        const topState = state[state.length - 1];
        const topStateName = topState.name;
        const reducer = clientActionReducers[topStateName];
        if (reducer) {
          const newTopState = reducer(topState, action);
          if (shallowEqual(topState, newTopState)) {
            return state;
          } else {
            return state.slice(0, state.length - 1).concat(newTopState);
          }
        }
        return state;
      }
  }
}

function messageAction(from, to, message) {
  return {
    type: 'MESSAGE',
    id: guid(),
    from: from,
    guid: to !== 'all' ? to : undefined,
    to: to,
    message: message
  };
}

function setNameAction(guid$$1, name) {
  return {
    type: 'CLIENT_SET_NAME',
    guid: guid$$1,
    name: name
  };
}

function setClassAction(guid$$1, className) {
  return {
    type: 'CLIENT_SET_CLASS',
    guid: guid$$1,
    name: className
  };
}

function nameSelector(state) {
  return state.name;
}

function classNameSelector(state) {
  return state.className;
}

function idSelector(state) {
  return `${ nameSelector(state) }[${ classNameSelector(state) }]`;
}

function actionsSelector(state) {
  return state.actions;
}

function actionStateSelector(state) {
  return state.actionState;
}

function actionStateCountSelector(state) {
  return actionStateSelector(state).length;
}

function currentActionStateSelector(state) {
  return state.actionState[state.actionState.length - 1];
}

function currentActionStateNameSelector(state) {
  return currentActionStateSelector(state).name;
}

const initialState$1 = {
  name: 'Noname',
  className: 'Noone',
  actionState: [],
  actions: [{
    name: 'Shield',
    slots: [{
      require: 1
    }]
  }, {
    name: 'Maneuver',
    slots: [{
      require: 3
    }]
  }, {
    name: 'Throw',
    slots: [{
      require: 6
    }]
  }, {
    name: 'Fireball',
    slots: [{
      require: 5
    }, {
      require: 6
    }]
  }],
  messages: [{
    id: guid(),
    from: 'Chat System',
    to: 'all',
    message: 'Welcome to chat'
  }]
};

function contextReducer(state = initialState$1, action) {
  switch (action.type) {
    case 'MESSAGE':
      return Object.assign({}, state, {
        messages: state.messages.concat({
          id: action.id,
          from: action.from,
          to: action.to,
          message: action.message
        })
      });
    case 'CLIENT_SET_NAME':
      return Object.assign({}, state, {
        name: action.name
      });
    case 'CLIENT_SET_CLASS':
      return Object.assign({}, state, {
        className: action.name
      });
    case 'LOAD_CLIENT_STATE':
      return action.state;
    default:
      return changed(state, Object.assign({}, state, {
        actionState: actionStateReducer(state.actionState, action)
      }));
  }
}

function clientSelector(rootState, guid$$1) {
  return rootState.contexts[guid$$1].shared;
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

var introduction$1 = {
  onEnter: (guid, getState, dispatch) => {
    //dispatch(message('GM', guid, 'You are entering town gate, the sign says "Welcome to Northwinter". Gate keeper is looking at you very suspiciously.'))
    //dispatch(message('Gate Keeper', guid, 'Who the fuck are you?'))
    //dispatch(message('GM' , guid, 'You are quite sure that not giving this man proper answer will get you into trouble. Please type your name.'))
    dispatch(messageAction('GM', guid, 'Name?'));
  },
  onCommand: (guid, getState, dispatch, command) => {
    const name = command;
    //dispatch(message('Gate Keeper', guid, `So... Your name is ${command}. I have never heard about you.`))
    //dispatch(message('GM', guid, 'Gate Keeper now looks at you even more suspiciously.'))
    dispatch(setNameAction(guid, name));
    dispatch(setStateAction(guid, 'classSelection'));
  }
};

const classes = ['mage', 'warrior', 'priest', 'hunter', 'stone'];
const gateKeeper = 'Gate Keeper';

var classSelection$1 = {
  onEnter: (guid, getState, dispatch) => {
    //dispatch(message(gateKeeper, guid, 'Listen buddy, we have rules here, and the rules are: '+
    //  'Every fucker entering that town behind me must be on the list I have here. If not...'))
    //dispatch(message('GM', guid, 'Gate keeper looks at amulet you have on your neck.'))

    //dispatch(message(gateKeeper, guid,' well give me a second and I will sign you in.'))
    //dispatch(message(gateKeeper, guid,'I just need to know your class'))
    //dispatch(message('GM', guid, `Available classes are: ${classes.join(', ')} type in the name of the class you want`))
    dispatch(messageAction('GM', guid, `Class?[${ classes.join(', ') }]`));
  },
  onCommand: (guid, getState, dispatch, command) => {
    if (classes.includes(command)) {
      //dispatch(message(gateKeeper, guid, 'Yes... yes... we allow those guys in, come in...'))
      dispatch(setClassAction(guid, command));
      dispatch(setStateAction(guid, 'townLobby'));
    } else {
      //dispatch(message(gateKeeper, guid, `No, we don\'t allow any ${command} in this town. You must be thinking about something else.`))
      dispatch(messageAction(gateKeeper, guid, `Unknown class ${ command }.`));
    }
  }
};

const GM = 'GM';

var townLobby$1 = {
  onEnter: (guid, getState, dispatch) => {
    dispatch(messageAction(GM, guid, 'You are entering the town area. You see your friends here.'));
  },
  onReturn: (guid, getState, dispatch, fromState, returnedState) => {
    if (fromState === 'rollDices') {
      dispatch(pushStateAction(guid, 'assignDices', {
        rolledDices: returnedState.rolledDices
      }));
    }
  },
  onCommand: (guid, getState, dispatch, command) => {
    const state = getState();
    if (command === '/battle') {
      dispatch(pushStateAction(guid, 'battle'));
    } else {
      dispatch(messageAction(idSelector(clientSelector(state, guid)), 'all', command));
    }
  }
};

function onFinishRolling(getState, guid$$1, dispatch) {
  dispatch(popStateAction(guid$$1));
}

var rollDices$1 = {
  onEnter: (guid$$1, getState, dispatch) => {
    const firstRoll = [randomInt(1, 7), randomInt(1, 7), randomInt(1, 7), randomInt(1, 7), randomInt(1, 7)];
    const locks = [false, false, false, false];
    dispatch(rollAction(guid$$1, firstRoll));
    dispatch(lockAction(guid$$1, locks));
  },
  onCommand: (guid$$1, getState, dispatch, command) => {
    const state = getState();
    if (command.startsWith('/reroll')) {
      const currentDices = rolledDicesSelector(currentActionStateSelector(clientSelector(state, guid$$1)));
      const currentLocks = locksSelector(currentActionStateSelector(clientSelector(state, guid$$1)));
      const newDices = currentDices.map((el, index) => {
        if (!currentLocks[index]) {
          return randomInt(1, 7);
        } else {
          return el;
        }
      });
      //dispatch(message('GM', guid, `After ${numberOfRerolls(client(state, guid))} rerolls, you have: ${newDices}`))

      dispatch(rollAction(guid$$1, newDices));
      if (numberOfRerollsSelector(currentActionStateSelector(clientSelector(state, guid$$1))) >= 2) {
        onFinishRolling(getState, guid$$1, dispatch);
      }
    } else if (command.startsWith('/keep')) {
      onFinishRolling(state, guid$$1, dispatch);
    } else if (command.startsWith('/lock')) {
      const splited = command.split(' ');
      if (splited.length === 2) {
        const index = +splited[1];
        const currentLocks = locksSelector(currentActionStateSelector(clientSelector(state, guid$$1)));
        let newLocks = currentLocks.slice(0, currentLocks.length);
        newLocks[index] = !newLocks[index];
        dispatch(lockAction(guid$$1, newLocks));
      }
    } else {
      dispatch(messageAction('GM', guid$$1, 'Unrecognized command, please use /reroll <number> ... <number> or /keep'));
    }
  }
};

var assignDices$1 = {
  onCommand(guid, getState, dispatch, command) {
    const state = getState();
    if (command.startsWith('/assign')) {
      const clientRolledDices = currentDicesSelector(currentActionStateSelector(clientSelector(state, guid)));
      const splited = command.split(' ');
      const actionIndex = +splited[1];
      const slotIndex = +splited[2];
      const clientActions = actionsSelector(clientSelector(state, guid));
      const selectedAction = clientActions[actionIndex];
      const selectedSlot = selectedAction.slots[slotIndex];
      const requiredDice = selectedSlot.require;

      if (clientRolledDices.includes(requiredDice)) {
        dispatch(assignDiceAction(guid, actionIndex, slotIndex, requiredDice));
      }
    } else if (command.startsWith('/reset')) {
      dispatch(resetAction(guid));
    } else if (command.startsWith('/done')) {
      const player = idSelector(clientSelector(state, guid));
      const clientActions = actionsSelector(clientSelector(state, guid));
      const clientAssignedActions = assignedActionsSelector(currentActionStateSelector(clientSelector(state, guid)));

      const enabledActions = [];

      clientActions.forEach((clientAction, actionIndex) => {
        const slots = clientAssignedActions[actionIndex];
        if (!slots) return;
        let passed = true;
        clientAction.slots.forEach((actionSlot, slotIndex) => {
          const dice = slots[slotIndex];
          if (actionSlot.require !== dice) {
            passed = false;
          }
        });
        if (passed) {
          enabledActions.push(clientAction);
        }
      });

      dispatch(messageAction('GM', 'all', `${ player } enabled [${ enabledActions.map(a => a.name) }]`));
      dispatch(popStateAction(guid));
    }
  }
};

const GM$1 = 'GM';

var battle$1 = {
  onEnter: (guid, getState, dispatch) => {
    dispatch(messageAction(GM$1, guid, 'You are entering battle.'));
    dispatch(pushStateAction(guid, 'rollDices'));
  },
  onReturn: (guid, getState, dispatch, fromState, returnedState) => {
    log.info(`${ guid } Return from state: `, fromState, returnedState);
    if (fromState === 'rollDices') {
      dispatch(pushStateAction(guid, 'assignDices', {
        rolledDices: returnedState.rolledDices
      }));
    }
  },
  onCommand: (guid, getState, dispatch, command) => {
    const state = getState();
  }
};



var actionStateHandlers = Object.freeze({
	introduction: introduction$1,
	classSelection: classSelection$1,
	townLobby: townLobby$1,
	rollDices: rollDices$1,
	assignDices: assignDices$1,
	battle: battle$1
});

function serverMiddleware({ getState, dispatch }) {
  return next => action => {
    if (action.type === 'CONTEXT_SPAWNED') {
      const result = next(action);
      if (actionStateCountSelector(clientSelector(getState(), action.guid)) === 0) {
        dispatch({
          type: 'CLIENT_STATE_ENTER_PUSH',
          guid: action.guid,
          name: 'introduction'
        });
      }
      return result;
    } else if (action.type === 'CLIENT_STATE_ENTER_PUSH' || action.type === 'CLIENT_STATE_ENTER_REPLACE') {
      const result = next(action);
      if (actionStateCountSelector(clientSelector(getState(), action.guid)) > 0) {
        const name = currentActionStateNameSelector(clientSelector(getState(), action.guid));
        log.info(`${ action.guid } entering state ${ name }`);
        if (actionStateHandlers[name].onEnter) {
          actionStateHandlers[name].onEnter(action.guid, getState, dispatch);
        }
      }
      return result;
    } else if (action.type === 'CLIENT_STATE_POP') {
      const fromStateName = currentActionStateNameSelector(clientSelector(getState(), action.guid));
      const fromStateInternalState = currentActionStateSelector(clientSelector(getState(), action.guid));
      const result = next(action);
      if (actionStateCountSelector(clientSelector(getState(), action.guid)) > 0) {
        const name = currentActionStateNameSelector(clientSelector(getState(), action.guid));
        log.info(`${ action.guid } returning from ${ fromStateName } state  to ${ name } state`);
        if (actionStateHandlers[name].onReturn) {
          actionStateHandlers[name].onReturn(action.guid, getState, dispatch, fromStateName, fromStateInternalState);
        }
      }
      return result;
    } else if (action.type === 'COMMAND_REQUEST') {
      if (actionStateCountSelector(clientSelector(getState(), action.guid)) > 0) {
        const name = currentActionStateNameSelector(clientSelector(getState(), action.guid));
        actionStateHandlers[name].onCommand(action.guid, getState, dispatch, action.command);
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
      if (stateChanged && targetSocket) {
        log.info(`After ${ action.type } state for ${ key } changed, sending action`);
        targetSocket.emit('action', action);
      } else {
        log.info(`After ${ action.type } state for ${ key } is same`);
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
