"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var minimatch = require("minimatch");
exports.nextState = function (id, data) {
    if (data === void 0) { data = {}; }
    return __assign({ stateId: id }, data);
};
exports.path = function (stack) {
    return stack.map(function (s) { return s.stateId; }).join('/');
};
exports.head = function (stack) {
    return stack.length && stack[stack.length - 1];
};
exports.push = function (stack) {
    var state = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        state[_i - 1] = arguments[_i];
    }
    return stack.concat(state);
};
exports.pop = function (stack) {
    return stack.slice(0, stack.length - 1);
};
exports.splitHead = function (stack) {
    return stack.length > 0 ? [stack.slice(0, stack.length - 1), stack[stack.length - 1]] : [[], undefined];
};
exports.splitLastTwo = function (stack) {
    if (stack.length >= 2) {
        return [stack.slice(0, stack.length - 2), stack[stack.length - 2], stack[stack.length - 1]];
    }
    else if (stack.length === 1) {
        return [[], undefined, stack[0]];
    }
    else {
        return [[], undefined, undefined];
    }
};
exports.match = function (path, query) {
    return minimatch(path, query);
};
exports.createStackReducer = function (reducersMap) { return function (state, action) {
    if (state === void 0) { state = []; }
    var prevState = undefined;
    var MAX_ITER = 99;
    var iter = 0;
    while (true) {
        if (prevState === state)
            return state;
        if (iter > MAX_ITER)
            throw Error('Max Iteration reached, probably loop');
        ++iter;
        prevState = state;
        state = Object.keys(reducersMap).reduce(function (acc, query) { return exports.match(exports.path(state), query) ? reducersMap[query](acc, action) : acc; }, state);
    }
}; };
