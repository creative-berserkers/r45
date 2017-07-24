"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var injectTapEventPlugin = require("react-tap-event-plugin");
var model_1 = require("../model");
var client_io_1 = require("./client-io");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var ReactDOM = require("react-dom");
var React = require("react");
var MuiThemeProvider_1 = require("material-ui/styles/MuiThemeProvider");
injectTapEventPlugin();
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose;
var store = redux_1.createStore(model_1.default, composeEnhancers(redux_1.applyMiddleware(client_io_1.commandMiddleware)));
var render = function () {
    Promise.resolve().then(function () { return require('../view/Game'); }).then(function (_a) {
        var Component = _a.default;
        ReactDOM.render(<react_redux_1.Provider store={store}>
          <MuiThemeProvider_1.default>
          <Component />
          </MuiThemeProvider_1.default>
        </react_redux_1.Provider>, document.getElementById('mount'));
    });
};
render();
if (module.hot) {
    module.hot.accept(render);
}
