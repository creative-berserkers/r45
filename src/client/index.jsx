"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppContainer_1 = require("../view/AppContainer");
var model_1 = require("../model");
var client_io_1 = require("./client-io");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var ReactDOM = require("react-dom");
var React = require("react");
require("../assets/css/bootstrap.min.css");
require("../assets/css/bootstrap-theme.min.css");
require("../assets/css/style.css");
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose;
var store = redux_1.createStore(model_1.default, composeEnhancers(redux_1.applyMiddleware(client_io_1.commandMiddleware)));
ReactDOM.render(<react_redux_1.Provider store={store}>
      <AppContainer_1.default />
    </react_redux_1.Provider>, document.getElementById('mount'));
