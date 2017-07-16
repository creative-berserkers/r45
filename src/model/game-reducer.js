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
var stack_reducer_1 = require("./stack-reducer");
var playerSetupReducer = stack_reducer_1.createStackReducer({});
exports.PLAYER_JOIN = 'PLAYER_JOIN';
exports.joinPlayer = function (playerId) {
    return {
        type: exports.PLAYER_JOIN,
        playerId: playerId
    };
};
exports.PLAYER_ACTION = 'PLAYER_ACTION';
exports.playerAction = function (playerId, wrappedAction) {
    return {
        type: exports.PLAYER_ACTION,
        playerId: playerId,
        wrappedAction: wrappedAction
    };
};
exports.GAME_START = 'GAME_START';
exports.startGame = function () {
    return {
        type: exports.GAME_START
    };
};
exports.gameReducer = stack_reducer_1.createStackReducer({
    '': function (stack, action) { return stack_reducer_1.push(stack, stack_reducer_1.nextState('join', { players: {} })); },
    'join': function (stack, action) {
        switch (action.type) {
            case exports.PLAYER_JOIN: {
                var _a = stack_reducer_1.splitHead(stack), tail = _a[0], head = _a[1];
                if (head === undefined)
                    return stack;
                var state = head;
                var playerJoinAction = action;
                return tail.concat([__assign({}, head, { players: __assign({}, state.players, (_b = {}, _b[playerJoinAction.playerId] = [], _b)) })]);
            }
            case exports.PLAYER_ACTION: {
                var _c = stack_reducer_1.splitHead(stack), tail = _c[0], head = _c[1];
                if (head === undefined)
                    return stack;
                var state = head;
                var playerAction_1 = action;
                return tail.concat([__assign({}, head, { players: __assign({}, state.players, (_d = {}, _d[playerAction_1.playerId] = playerSetupReducer(state.players[playerAction_1.playerId], playerAction_1.wrappedAction), _d)) })]);
            }
            case 'GAME_START': {
                var _e = stack_reducer_1.splitHead(stack), tail = _e[0], head = _e[1];
                if (head === undefined)
                    return stack;
                var state = head;
                return tail.concat([stack_reducer_1.nextState('play', { players: state.players })]);
            }
            default:
                return stack;
        }
        var _b, _d;
    },
    'play': function (stack, action) {
        return stack;
    }
});
