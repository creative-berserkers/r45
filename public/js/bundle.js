(function (React$1,reactRedux,redux,ReactDOM) {
'use strict';

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function guid() {

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
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


function setPlayerNameAction(playerName, guid$$1) {
  return {
    type: SET_PLAYER_NAME,
    guid: guid$$1,
    playerName: playerName
  };
}



const initialState = {
  name: STATE_NAME,
  playerName: 'Noname',
  messages: []
};

function introduction(state = initialState, action) {
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





function loadClientStateAction(state, guid) {
  return {
    type: CLIENT_STATE_LOAD,
    guid: guid,
    state: state
  };
}

function currentClientStateSelector(state) {
  return state[state.length - 1];
}



function clientStateSelector(state, name) {
  return state.find(s => s.name === name);
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

var css = {
    "defaultState": "mcbcd0e2a3_defaultState",
    "introductionState": "mcbcd0e2a3_introductionState",
    "classSelectionState": "mcbcd0e2a3_classSelectionState",
    "townLobbyState": "mcbcd0e2a3_townLobbyState",
    "rollDicesState": "mcbcd0e2a3_rollDicesState",
    "assignDicesState": "mcbcd0e2a3_assignDicesState",
    "battleState": "mcbcd0e2a3_battleState",
    "chat": "mcbcd0e2a3_chat",
    "map": "mcbcd0e2a3_map",
    "dicepool": "mcbcd0e2a3_dicepool",
    "actionpool": "mcbcd0e2a3_actionpool",
    "battlefield": "mcbcd0e2a3_battlefield",
    "rerollButton": "mcbcd0e2a3_rerollButton",
    "midButton": "mcbcd0e2a3_midButton",
    "diceSpace": "mcbcd0e2a3_diceSpace"
};

var css$1 = {
    "actionComponent": "mc48c3b198_actionComponent",
    "diceSlot": "mc48c3b198_diceSlot",
    "dice": "mc48c3b198_dice",
    "diceLocked": "mc48c3b198_diceLocked",
    "diceSpace": "mc48c3b198_diceSpace",
    "messageLogContainer": "mc48c3b198_messageLogContainer",
    "messageLogContainerList": "mc48c3b198_messageLogContainerList",
    "messageLogContainerInput": "mc48c3b198_messageLogContainerInput",
    "messageLogContainerSend": "mc48c3b198_messageLogContainerSend",
    "messageAuthorName": "mc48c3b198_messageAuthorName",
    "messageScrollContainer": "mc48c3b198_messageScrollContainer"
};

let MessageLog = class MessageLog extends React$1.Component {

  constructor() {
    super();
  }

  componentDidUpdate() {
    this.refs.messages.scrollTop = this.refs.messages.scrollHeight;
    this.refs.chatInput.focus();
  }

  render() {

    let handleClick = () => {
      this.props.onSend(this.refs.chatInput.value);
      this.refs.chatInput.value = '';
    };

    let handleKeyboard = e => {
      if (e.key === 'Enter') {
        handleClick();
      }
    };

    return React$1.createElement(
      'div',
      { className: `${ this.props.className } ${ css$1.messageLogContainer }` },
      React$1.createElement(
        'div',
        { key: 'list', ref: 'messages', className: css$1.messageLogContainerList },
        this.props.children
      ),
      React$1.createElement('input', { key: 'input', className: css$1.messageLogContainerInput, ref: 'chatInput', onKeyUp: handleKeyboard }),
      React$1.createElement(
        'button',
        { key: 'send', className: css$1.messageLogContainerSend, onClick: handleClick },
        'Send'
      )
    );
  }
};

function Message({ id, from, message }) {
  return React$1.createElement(
    'div',
    { key: id },
    React$1.createElement(
      'span',
      { className: css$1.messageAuthorName },
      from
    ),
    ':',
    message
  );
}

let IntroductionComponent = class IntroductionComponent extends React$1.Component {
  constructor() {
    super();
  }

  render() {
    const { messages, onSend } = this.props;

    return React$1.createElement(
      'div',
      { className: `${ css.defaultState } ${ css.introductionState }` },
      React$1.createElement(
        MessageLog,
        { onSend: onSend, className: css.chat },
        messages.map(({ id, from, message }) => React$1.createElement(Message, { key: id, from: from, message: message }))
      )
    );
  }
};


const mapStateToDispatch = dispatch => {
  return {
    onSend: command => {
      dispatch(setPlayerNameAction(command));
    }
  };
};

const mapStateToProps$1 = state => {
  return {
    messages: clientStateSelector(state, STATE_NAME).messages
  };
};

var chat$$1 = reactRedux.connect(mapStateToProps$1, mapStateToDispatch)(IntroductionComponent);

//import introduction from './introduction'
//import classSelection from './class-selection'
//import townLobby from './town-lobby'
//import rollDices from './roll-dices'
//import assignDices from './assign-dices'
//import battle from './battle'


var clientStates = Object.freeze({
	chat: chat$$1
});

let AppContainer = class AppContainer extends React$1.Component {
  constructor() {
    super();
  }

  render() {
    const { clientState } = this.props;
    if (!clientState) return React$1.createElement(
      'div',
      null,
      'Loading...'
    );

    const StateContainer = clientStates[clientState.name];
    return React$1.createElement(StateContainer, null);
  }
};


const mapDispatchToProps = function (dispatch) {
  return {};
};

const mapStateToProps = function (state) {
  return {
    clientState: currentClientStateSelector(state)
  };
};

var AppContainer$1 = reactRedux.connect(mapStateToProps, mapDispatchToProps)(AppContainer);

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

function command({ getState, dispatch }) {
  const socket = io();

  let authToken = localStorage.getItem('auth-token');
  if (!authToken) {
    authToken = guid();
    localStorage.setItem('auth-token', authToken);
  }

  socket.on('connect', function onConnect() {
    log.info('connected');
    socket.emit('authentication', authToken);
  });

  socket.on('initial_state', function onInitialState(state) {
    log.info('initial_state', state);
    dispatch(loadClientStateAction(state));
  });

  socket.on('action', function onAction(action) {
    dispatch(action);
  });

  return next => action => {
    const actionJSON = JSON.stringify(action);
    log.info(`Action: ${ actionJSON }`);
    if (action.type === 'COMMAND_REQUEST') {
      socket.emit('command_request', action);
      return {};
    } else {
      return next(action);
    }
  };
}

/*global __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
const store = redux.createStore(contextReducer, composeEnhancers(redux.applyMiddleware(command)));

ReactDOM.render(React.createElement(
  reactRedux.Provider,
  { store: store },
  React.createElement(AppContainer$1, null)
), document.getElementById('mount'));

}(React,ReactRedux,Redux,ReactDOM));
//# sourceMappingURL=bundle.js.map
