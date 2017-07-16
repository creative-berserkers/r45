"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filterFirst(array, element) {
    var found = false;
    var newArray = [];
    array.forEach(function (el) {
        if (el != element || found) {
            newArray.push(el);
        }
        else {
            found = true;
        }
    });
    return newArray;
}
exports.default = filterFirst;
