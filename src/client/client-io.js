"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var guid_1 = require("../utils/guid");
var log_1 = require("./log");
//import {loadStateAction} from '../model/index'
var io = require("socket.io-client");
function getClientGuid() {
    var authToken = localStorage.getItem('auth-token');
    if (!authToken) {
        authToken = guid_1.default();
        localStorage.setItem('auth-token', authToken);
    }
    return authToken;
}
exports.getClientGuid = getClientGuid;
exports.commandMiddleware = function (_a) {
    var dispatch = _a.dispatch, getState = _a.getState;
    var socket = io('http://localhost:9090/');
    return function (next) {
        socket.on('connect', function onConnect() {
            log_1.default.info('connected');
            socket.emit('authentication', getClientGuid());
        });
        socket.on('state_sync', function (state) {
            log_1.default.info('state_sync', state);
            //next(loadStateAction(state))
        });
        socket.on('action', function onAction(action) {
            log_1.default.info('dispatched', JSON.stringify(action, undefined, 2));
            log_1.default.info('state before', getState());
            next(action);
            log_1.default.info('state after', getState());
        });
        return function (action) {
            var actionJSON = JSON.stringify(action);
            log_1.default.info("Action: " + actionJSON);
            socket.emit('command_request', action);
            return {};
        };
    };
};
