(function (React$1,reactRedux,redux,ReactDOM) {
'use strict';

var css = {
    "mainContainer": "mcf9760dce_mainContainer",
    "rollState": "mcf9760dce_rollState",
    "chat": "mcf9760dce_chat",
    "map": "mcf9760dce_map",
    "dicepool": "mcf9760dce_dicepool",
    "action": "mcf9760dce_action"
};

function currentActionState(state) {
  return state.actionState[state.actionState.length - 1];
}

var css$1 = {
    "messageLogContainer": "mc7dc0d4f3_messageLogContainer",
    "messageLogContainerList": "mc7dc0d4f3_messageLogContainerList",
    "messageLogContainerInput": "mc7dc0d4f3_messageLogContainerInput",
    "messageLogContainerSend": "mc7dc0d4f3_messageLogContainerSend",
    "messageAuthorName": "mc7dc0d4f3_messageAuthorName",
    "messageScrollContainer": "mc7dc0d4f3_messageScrollContainer"
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

  componentDidUpdate() {
    this.refs.messages.scrollTop = this.refs.messages.scrollHeight;
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
        { key: 'list', ref: 'messages', className: css$1.messageLogContainerList },
        messages.map(message => {
          return React$1.createElement(
            'div',
            { key: message.id },
            React$1.createElement(
              'span',
              { className: css$1.messageAuthorName },
              message.from
            ),
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


const mapDispatchToProps$1 = function (dispatch) {
  return {
    onSend: function (command) {
      dispatch({ type: 'COMMAND_REQUEST', command: command });
    }
  };
};

const mapStateToProps$1 = function (state) {
  return {
    messages: state.messages
  };
};

var MessageLogContainer$2 = reactRedux.connect(mapStateToProps$1, mapDispatchToProps$1)(MessageLogContainer$1);

var css$2 = {
    "dicePoolComponent": "mc035ae162_dicePoolComponent",
    "dice": "mc035ae162_dice",
    "diceLocked": "mc035ae162_diceLocked",
    "diceSpace": "mc035ae162_diceSpace",
    "diceSlot": "mc035ae162_diceSlot",
    "rerollButton": "mc035ae162_rerollButton"
};

let DiceComponent = class DiceComponent extends React$1.Component {

  render() {
    const {
      className,
      face,
      lock,
      onClick } = this.props;

    const imagePath = `/public/img/dices/${ face }_dots.png`;

    return React$1.createElement(
      'div',
      { className: `${ className } ${ css$2.dice } ${ lock ? css$2.diceLocked : '' }`,
        onClick: onClick },
      React$1.createElement('img', { src: imagePath, width: '32px', height: '32px' })
    );
  }
};

let DicePoolComponent = class DicePoolComponent extends React$1.Component {

  render() {
    const { className: className$$1, dices, onReroll, onLock, locks } = this.props;

    return React$1.createElement(
      'div',
      { className: `${ className$$1 } ${ css$2.dicePoolComponent }` },
      React$1.createElement(
        'button',
        { className: css$2.rerollButton, onClick: event => {
            onReroll();
          } },
        'Reroll dices'
      ),
      dices.map((number, index) => React$1.createElement(DiceComponent, { className: css$2.diceSpace, key: index, face: number, lock: locks[index], onClick: onLock.bind(undefined, index) }))
    );
  }
};


const mapStateToProps$2 = state => ({
  dices: currentActionState(state).rolledDices,
  locks: currentActionState(state).locks
});

const mapDispatchToProps$2 = dispatch => ({
  onReroll: () => {
    dispatch({ type: 'COMMAND_REQUEST', command: '/reroll' });
  },
  onLock: index => {
    dispatch({ type: 'COMMAND_REQUEST', command: `/lock ${ index }` });
  }
});

var DicePoolContainer$1 = reactRedux.connect(mapStateToProps$2, mapDispatchToProps$2)(DicePoolComponent);

var css$3 = {
    "actionPoolComponent": "mc51ad5f45_actionPoolComponent",
    "actionComponent": "mc51ad5f45_actionComponent",
    "diceSlot": "mc51ad5f45_diceSlot"
};

let ActionComponent = class ActionComponent extends React$1.Component {
  constructor() {
    super();
  }

  render() {

    const { name } = this.props;

    return React$1.createElement(
      'div',
      { className: `${ this.props.className } ${ css$3.actionComponent }` },
      name,
      React$1.createElement(
        'div',
        { className: css$3.diceSlot },
        this.props.children
      )
    );
  }
};

let DiceSlotComponent = class DiceSlotComponent extends React$1.Component {

  render() {
    const {
      className,
      face,
      onClick } = this.props;

    const imagePath = `url(/public/img/dices/${ face }_dots_slot.png)`;
    const style = {
      background: imagePath,
      backgroundSize: '32px 32px',
      backgroundRepeat: 'no-repeat'
    };

    return React$1.createElement(
      'div',
      { className: `${ className } ${ css$2.diceSlot }`,
        onClick: onClick, style: style },
      this.props.children
    );
  }
};

let ActionPoolComponent = class ActionPoolComponent extends React$1.Component {
  constructor() {
    super();
  }

  render() {
    const { className, actions } = this.props;
    return React$1.createElement(
      'div',
      { className: `${ this.props.className } ${ css$3.actionPoolComponent }` },
      actions.map(action => React$1.createElement(
        ActionComponent,
        { name: action.name },
        React$1.createElement(DiceSlotComponent, { face: 6 }),
        React$1.createElement(
          DiceSlotComponent,
          { face: 4 },
          React$1.createElement(DiceComponent, { face: 4 })
        ),
        React$1.createElement(DiceSlotComponent, { face: 2 })
      ))
    );
  }
};

const mapStateToProps$3 = state => ({
  actions: state.actions
});

const mapDispatchToProps$3 = dispatch => ({});

var ActionPoolContainer$1 = reactRedux.connect(mapStateToProps$3, mapDispatchToProps$3)(ActionPoolComponent);

let AppContainer = class AppContainer extends React$1.Component {
  constructor() {
    super();
  }

  render() {
    const actionState$$1 = this.props.actionState;
    const name$$1 = actionState$$1 ? actionState$$1.name : 'none';
    if (name$$1 === 'rollDices') {
      return React$1.createElement(
        'div',
        { className: `${ css.mainContainer } ${ css.rollState }` },
        React$1.createElement(MessageLogContainer$2, { className: css.chat }),
        React$1.createElement(DicePoolContainer$1, { className: css.dicepool }),
        React$1.createElement(ActionPoolContainer$1, { className: css.action })
      );
    } else {
      return React$1.createElement(
        'div',
        { className: css.mainContainer },
        React$1.createElement(MessageLogContainer$2, { className: css.chat }),
        React$1.createElement(ActionPoolContainer$1, { className: css.action })
      );
    }
  }
};


const mapDispatchToProps = function (dispatch) {
  return {};
};

const mapStateToProps = function (state) {
  return {
    actionState: currentActionState(state)
  };
};

var AppContainer$1 = reactRedux.connect(mapStateToProps, mapDispatchToProps)(AppContainer);

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

const ROLL = 'ROLL_DICES:ROLL';
const LOCK = 'ROLL_DICES:LOCK';





const initialState$1 = {
  name: 'rollDices',
  rolledDices: [],
  locks: [],
  numberOfRolls: 0
};

function rollDices(state = initialState$1, action) {
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

const initialState$2 = {
  name: 'introduction'
};

function introduction(state = initialState$2, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const initialState$3 = {
  name: 'classSelection'
};

function classSelection(state = initialState$3, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const initialState$4 = {
  name: 'townLobby'
};

function townLobby(state = initialState$4, action) {
  switch (action.type) {
    default:
      return state;
  }
}



var clientActionReducers = Object.freeze({
	rollDices: rollDices,
	introduction: introduction,
	classSelection: classSelection,
	townLobby: townLobby
});

function actionStateReducer(state = [], action) {
  switch (action.type) {
    case 'CLIENT_STATE_ENTER_PUSH':
      return state.concat(clientActionReducers[action.name](undefined, { type: '@INIT@' }));
    case 'CLIENT_STATE_POP':
      return state.slice(0, state.length - 1);
    case 'CLIENT_STATE_ENTER_REPLACE':
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

const initialState = {
  name: 'Noname',
  className: 'Noone',
  actionState: [],
  actions: [{
    name: 'fireball',
    slots: [{
      require: 5,
      dices: []
    }]
  }, {
    name: 'throw',
    slots: [{
      require: 6,
      dices: []
    }]
  }],
  messages: [{
    id: guid(),
    from: 'Chat System',
    to: 'all',
    message: 'Welcome to chat'
  }]
};

function contextReducer(state = initialState, action) {
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

const initialState$5 = {
  connected: false,
  shared: contextReducer(undefined, { type: '@INIT@' })
};

function clientContextReducer(state = initialState$5, action) {
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

redux.combineReducers({
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
  React.createElement(AppContainer$1, null)
), document.getElementById('mount'));

}(React,ReactRedux,Redux,ReactDOM));
