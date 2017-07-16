"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function uniqueArray(array) {
    var n = {}, r = [];
    for (var i = 0; i < array.length; i++) {
        if (!n[array[i]]) {
            n[array[i]] = true;
            r.push(array[i]);
        }
    }
    return r;
}
exports.default = uniqueArray;
