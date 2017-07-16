"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
//import {getContext} from '../model/index'
//import {queryResponseAction} from '../model/states/input-query'
var stackViewMapping = {
    'setup:inputQuery': function (_a, dispatch) {
        var setupState = _a[0], query = _a[1].query;
        var inputVal = '';
        return <div>
      <span>Please provide your {query}</span>
      <input type="text" onChange={function (event) { inputVal = event.target.value; }}/>
      <input type="button" value="Send" onClick={function () { }}/>
    </div>;
    }
};
function AppContainer(_a) {
    var clientStateName = _a.clientStateName, stack = _a.stack, dispatch = _a.dispatch;
    var view = stackViewMapping[clientStateName] || (function () { return <div>View: '{clientStateName}' not found</div>; });
    return view(stack, dispatch);
}
exports.AppContainer = AppContainer;
var mapDispatchToProps = function (dispatch) {
    return { dispatch: dispatch };
};
var mapStateToProps = function (state) {
    //const stack = getStack(getContext(state, getClientGuid()));
    return {
        clientStateName: 'Temporarly disabled',
        stack: []
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AppContainer);
