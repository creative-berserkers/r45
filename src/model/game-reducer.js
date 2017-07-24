"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stack_reducer_1 = require("./stack-reducer");
exports.INIT_STATE_ID = '';
exports.BATTLE_STATE_ID = 'battle';
exports.battleState = {
    stateId: 'battle',
    groups: {
        'group1': {},
        'group2': {},
        'group3': {}
    },
    units: {
        'unit1': { name: 'Unit1', group: 'group1' },
        'unit2': { name: 'Unit2', group: 'group2' },
        'unit3': { name: 'Unit3', group: 'group3' }
    }
};
exports.initReducer = function (stack, action) { return stack_reducer_1.push(stack, exports.battleState); };
exports.battleReducer = function (stack, action) {
    return stack;
};
//export type GameReducer = <T, A extends Action>(state:Stack<T>, action: A) => Stack<T>
exports.gameReducer = stack_reducer_1.createStackReducer({
    '': exports.initReducer,
    'battle': exports.battleReducer
});
