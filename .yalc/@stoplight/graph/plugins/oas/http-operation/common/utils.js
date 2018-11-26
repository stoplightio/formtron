"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flatten = require("lodash/flatten");
const map = require("lodash/map");
const uniq = require("lodash/uniq");
function mapDict(dict, callback) {
    return map(dict, (object, key) => callback(object, key));
}
exports.mapDict = mapDict;
function uniqFlatMap(collection) {
    return uniq(flatten(map(collection, Object.keys)));
}
exports.uniqFlatMap = uniqFlatMap;
//# sourceMappingURL=utils.js.map