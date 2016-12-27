(function (React$1,reactRedux,redux,ReactDOM) {
'use strict';

var redux__default = 'default' in redux ? redux['default'] : redux;

var css = {
    "mainContainer": "mcf9760dce_mainContainer",
    "chat": "mcf9760dce_chat",
    "map": "mcf9760dce_map",
    "dicepool": "mcf9760dce_dicepool",
    "action": "mcf9760dce_action"
};

var css$1 = {
    "messageLogContainer": "mc7dc0d4f3_messageLogContainer",
    "messageLogContainerList": "mc7dc0d4f3_messageLogContainerList",
    "messageLogContainerInput": "mc7dc0d4f3_messageLogContainerInput",
    "messageLogContainerSend": "mc7dc0d4f3_messageLogContainerSend"
};

let MessageLogContainer$1 = class MessageLogContainer extends React$1.Component {

  constructor() {
    super();
  }

  static propTypes() {
    return {
      messages: React$1.PropTypes.arrayOf(React$1.PropTypes.shape({
        text: React$1.PropTypes.string
      }))
    };
  }

  static defaultProps() {
    return {
      messages: []
    };
  }

  render() {

    const messages = this.props.messages;

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
        { key: 'list', className: css$1.messageLogContainerList },
        messages.map(message => {
          return React$1.createElement(
            'div',
            { key: message.id },
            message.from,
            ':',
            message.message
          );
        })
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


const mapDispatchToProps = function (dispatch) {
  return {
    onSend: function (command) {
      dispatch({ type: 'COMMAND_REQUEST', command: command });
    }
  };
};

const mapStateToProps = function (state) {
  return {
    messages: state.messages
  };
};

var MessageLogContainer$2 = reactRedux.connect(mapStateToProps, mapDispatchToProps)(MessageLogContainer$1);

let AppContainer = class AppContainer extends React$1.Component {
  constructor() {
    super();
  }

  render() {
    return React$1.createElement(
      'div',
      { className: css.mainContainer },
      React$1.createElement(MessageLogContainer$2, { className: css.chat })
    );
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

const initialState = {
  messages: [{
    id: guid(),
    from: 'Chat System',
    to: 'all',
    message: 'Welcome to chat'
  }]
};

function contextReducer(state = initialState, action) {
  switch (action.type) {
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

const initialState$1 = {
  connected: false,
  shared: contextReducer(undefined, { type: '@INIT@' })
};

function clientContextReducer(state = initialState$1, action) {
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
      return Object.assign({}, state, { [action.id]: clientContextReducer(state[action.id], action) });
    case 'CONTEXT_DESPAWNED':
      return Object.assign({}, state, { [action.id]: clientContextReducer(state[action.id], action) });
    default:
      return changed(state, Object.keys(state).reduce((newState, context) => {
        newState[context] = clientContextReducer(state[context], action);
        return newState;
      }, {}));
  }
}

redux__default.combineReducers({
  contexts: allContextsReducer
});

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
    dispatch({
      type: 'LOAD_CLIENT_STATE',
      state: state
    });
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
  React.createElement(AppContainer, null)
), document.getElementById('mount'));

}(React,ReactRedux,Redux,ReactDOM));
