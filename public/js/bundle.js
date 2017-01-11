(function (React$1,reactRedux,redux,ReactDOM) {
'use strict';

function currentActionState(state) {
  return state.actionState[state.actionState.length - 1];
}

var css = {
    "defaultState": "mc728c9c8e_defaultState",
    "introductionState": "mc728c9c8e_introductionState",
    "classSelectionState": "mc728c9c8e_classSelectionState",
    "townLobbyState": "mc728c9c8e_townLobbyState",
    "rollDicesState": "mc728c9c8e_rollDicesState",
    "assignDicesState": "mc728c9c8e_assignDicesState",
    "chat": "mc728c9c8e_chat",
    "map": "mc728c9c8e_map",
    "dicepool": "mc728c9c8e_dicepool",
    "actionpool": "mc728c9c8e_actionpool",
    "rerollButton": "mc728c9c8e_rerollButton",
    "midButton": "mc728c9c8e_midButton",
    "diceSpace": "mc728c9c8e_diceSpace"
};

var css$1 = {
    "messageLogContainer": "mc7dc0d4f3_messageLogContainer",
    "messageLogContainerList": "mc7dc0d4f3_messageLogContainerList",
    "messageLogContainerInput": "mc7dc0d4f3_messageLogContainerInput",
    "messageLogContainerSend": "mc7dc0d4f3_messageLogContainerSend",
    "messageAuthorName": "mc7dc0d4f3_messageAuthorName",
    "messageScrollContainer": "mc7dc0d4f3_messageScrollContainer"
};

let MessageLogContainer = class MessageLogContainer extends React$1.Component {

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

let MessageLogContainer$1 = class MessageLogContainer extends React$1.Component {

  constructor() {
    super();
  }

  render() {
    const { id, from, message } = this.props;

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
};

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
        MessageLogContainer,
        { onSend: onSend, className: css.chat },
        messages.map(({ id, from, message }) => React$1.createElement(MessageLogContainer$1, { key: id, from: from, message: message }))
      )
    );
  }
};


const mapStateToDispatch = dispatch => {
  return {
    onSend: command => dispatch({ type: 'COMMAND_REQUEST', command: command })
  };
};

const mapStateToProps$1 = state => {
  return {
    messages: state.messages
  };
};

var IntroductionContainer = reactRedux.connect(mapStateToProps$1, mapStateToDispatch)(IntroductionComponent);

let ClassSelectionComponent = class ClassSelectionComponent extends React$1.Component {
  constructor() {
    super();
  }

  render() {
    const { messages, onSend } = this.props;

    return React$1.createElement(
      'div',
      { className: `${ css.defaultState } ${ css.classSelectionState }` },
      React$1.createElement(
        MessageLogContainer,
        { onSend: onSend, className: css.chat },
        messages.map(({ id, from, message }) => React$1.createElement(MessageLogContainer$1, { key: id, from: from, message: message }))
      )
    );
  }
};


const mapStateToDispatch$1 = dispatch => {
  return {
    onSend: command => dispatch({ type: 'COMMAND_REQUEST', command: command })
  };
};

const mapStateToProps$2 = state => {
  return {
    messages: state.messages
  };
};

var ClassSelectionContainer = reactRedux.connect(mapStateToProps$2, mapStateToDispatch$1)(ClassSelectionComponent);

let TownLobbyComponent = class TownLobbyComponent extends React$1.Component {
  constructor() {
    super();
  }

  render() {
    const { messages, onSend } = this.props;

    return React$1.createElement(
      'div',
      { className: `${ css.defaultState } ${ css.townLobbyState }` },
      React$1.createElement(
        MessageLogContainer,
        { onSend: onSend, className: css.chat },
        messages.map(({ id, from, message }) => React$1.createElement(MessageLogContainer$1, { key: id, from: from, message: message }))
      )
    );
  }
};


const mapStateToDispatch$2 = dispatch => {
  return {
    onSend: command => dispatch({ type: 'COMMAND_REQUEST', command: command })
  };
};

const mapStateToProps$3 = state => {
  return {
    messages: state.messages
  };
};

var TownLobbyContainer = reactRedux.connect(mapStateToProps$3, mapStateToDispatch$2)(TownLobbyComponent);

var css$2 = {
    "dicePoolComponent": "mc035ae162_dicePoolComponent",
    "dice": "mc035ae162_dice",
    "diceLocked": "mc035ae162_diceLocked",
    "diceSpace": "mc035ae162_diceSpace",
    "diceSlot": "mc035ae162_diceSlot"
};

let DicePoolComponent = class DicePoolComponent extends React$1.Component {

  render() {
    const { className } = this.props;

    return React$1.createElement(
      'div',
      { className: `${ className } ${ css$2.dicePoolComponent }` },
      this.props.children
    );
  }
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

var css$3 = {
    "actionPoolComponent": "mc51ad5f45_actionPoolComponent",
    "actionComponent": "mc51ad5f45_actionComponent",
    "diceSlot": "mc51ad5f45_diceSlot"
};

let ActionPoolComponent = class ActionPoolComponent extends React$1.Component {
  constructor() {
    super();
  }

  render() {
    const { className } = this.props;
    return React$1.createElement(
      'div',
      { className: `${ this.props.className } ${ css$3.actionPoolComponent }` },
      this.props.children
    );
  }
};

const mapStateToProps$5 = state => ({
  actions: state.actions
});

const mapDispatchToProps$1 = dispatch => ({});

var ActionPool = reactRedux.connect(mapStateToProps$5, mapDispatchToProps$1)(ActionPoolComponent);

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

let RollDicesContainer = class RollDicesContainer extends React$1.Component {
  constructor() {
    super();
  }

  render() {
    const { messages, onSend, onReroll, onLock, dices, locks, actions: actions$$1 } = this.props;

    return React$1.createElement(
      'div',
      { className: `${ css.defaultState } ${ css.rollDicesState }` },
      React$1.createElement(
        MessageLogContainer,
        { onSend: onSend, className: css.chat },
        messages.map(({ id, from, message }) => React$1.createElement(MessageLogContainer$1, { key: id, from: from, message: message }))
      ),
      React$1.createElement(
        DicePoolComponent,
        null,
        React$1.createElement(
          'button',
          { className: css.rerollButton, onClick: event => {
              onReroll();
            } },
          'Reroll dices'
        ),
        dices.map((number, index) => React$1.createElement(DiceComponent, { className: css.diceSpace, key: index, face: number, lock: locks[index], onClick: onLock.bind(undefined, index) }))
      ),
      React$1.createElement(
        ActionPool,
        { className: css.actionpool },
        actions$$1.map((action, actionIndex) => React$1.createElement(
          ActionComponent,
          { key: actionIndex, name: action.name },
          action.slots.map((slot, slotIndex) => React$1.createElement(DiceSlotComponent, { key: slotIndex, face: slot.require }))
        ))
      )
    );
  }
};


const mapStateToDispatch$3 = dispatch => {
  return {
    onSend: command => dispatch({ type: 'COMMAND_REQUEST', command: command }),
    onReroll: () => dispatch({ type: 'COMMAND_REQUEST', command: '/reroll' }),
    onLock: index => dispatch({ type: 'COMMAND_REQUEST', command: `/lock ${ index }` })
  };
};

const mapStateToProps$4 = state => {
  return {
    dices: currentActionState(state).rolledDices,
    locks: currentActionState(state).locks,
    messages: state.messages,
    actions: state.actions
  };
};

var RollDicesContainer$1 = reactRedux.connect(mapStateToProps$4, mapStateToDispatch$3)(RollDicesContainer);

function currentDices(state) {
  return state.currentDices;
}

function assignedActions(state) {
  return state.actions;
}

let AssignActionsContainer = class AssignActionsContainer extends React$1.Component {
  constructor() {
    super();
  }

  renderDice(actions$$1, actionIndex, slotIndex) {
    const action = actions$$1[actionIndex];
    if (!action) return undefined;
    const dice = action[slotIndex];
    if (dice) {
      return React$1.createElement(DiceComponent, { face: dice });
    } else {
      return undefined;
    }
  }

  render() {
    const { messages, onSend, onReset, onAssign, onDone, dices, actions: actions$$1, assignedActions: assignedActions$$1 } = this.props;
    return React$1.createElement(
      'div',
      { className: `${ css.defaultState } ${ css.assignDicesState }` },
      React$1.createElement(
        MessageLogContainer,
        { onSend: onSend, className: css.chat },
        messages.map(({ id, from, message }) => React$1.createElement(MessageLogContainer$1, { key: id, from: from,
          message: message }))
      ),
      React$1.createElement(
        DicePoolComponent,
        null,
        React$1.createElement(
          'button',
          { className: css.midButton, onClick: onReset },
          'Reset dices'
        ),
        React$1.createElement(
          'button',
          { className: css.midButton, onClick: onDone },
          'Done'
        ),
        dices.map((number, index) => React$1.createElement(DiceComponent, { className: css.diceSpace, key: index, face: number }))
      ),
      React$1.createElement(
        ActionPool,
        { className: css.actionpool },
        actions$$1.map((action, actionIndex) => React$1.createElement(
          ActionComponent,
          { key: actionIndex, name: action.name },
          action.slots.map((slot, slotIndex) => React$1.createElement(
            DiceSlotComponent,
            { key: slotIndex, face: slot.require,
              onClick: onAssign.bind(undefined, actionIndex, slotIndex) },
            this.renderDice(assignedActions$$1, actionIndex, slotIndex)
          ))
        ))
      )
    );
  }
};


const mapStateToDispatch$4 = dispatch => {
  return {
    onSend: command => dispatch({ type: 'COMMAND_REQUEST', command: command }),
    onReset: () => dispatch({ type: 'COMMAND_REQUEST', command: '/reset' }),
    onDone: () => dispatch({ type: 'COMMAND_REQUEST', command: '/done' }),
    onAssign: (actionIndex, slotIndex) => dispatch({
      type: 'COMMAND_REQUEST',
      command: `/assign ${ actionIndex } ${ slotIndex }`
    })
  };
};

const mapStateToProps$6 = state => {
  return {
    dices: currentDices(currentActionState(state)),
    assignedActions: assignedActions(currentActionState(state)),
    messages: state.messages,
    actions: state.actions
  };
};

var AssignDicesContainer = reactRedux.connect(mapStateToProps$6, mapStateToDispatch$4)(AssignActionsContainer);



var clientStates = Object.freeze({
	introduction: IntroductionContainer,
	classSelection: ClassSelectionContainer,
	townLobby: TownLobbyContainer,
	rollDices: RollDicesContainer$1,
	assignDices: AssignDicesContainer
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
    clientState: currentActionState(state)
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

const CLIENT_STATE_ENTER_PUSH$1 = 'CLIENT_STATE_ENTER_PUSH';
const ASSIGN_DICE = 'ASSIGN_DICES:ASSIGN_DICE';
const RESET = 'ASSIGN_DICES:RESET';

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





const initialState$5 = {
  name: 'assignDices',
  rolledDices: [],
  currentDices: [],
  actions: []
};
function assignDices(state = initialState$5, action) {
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



var clientActionReducers = Object.freeze({
	rollDices: rollDices,
	introduction: introduction,
	classSelection: classSelection,
	townLobby: townLobby,
	assignDices: assignDices
});

const CLIENT_STATE_ENTER_PUSH = 'CLIENT_STATE_ENTER_PUSH';
const CLIENT_STATE_POP = 'CLIENT_STATE_POP';
const CLIENT_STATE_ENTER_REPLACE = 'CLIENT_STATE_ENTER_REPLACE';







function actionStateReducer(state = [], action) {
  switch (action.type) {
    case CLIENT_STATE_ENTER_PUSH:
      console.log('pushing state ' + action.name);
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

const initialState = {
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

const initialState$6 = {
  connected: false,
  shared: contextReducer(undefined, { type: '@INIT@' })
};

function clientContextReducer(state = initialState$6, action) {
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
//# sourceMappingURL=bundle.js.map
