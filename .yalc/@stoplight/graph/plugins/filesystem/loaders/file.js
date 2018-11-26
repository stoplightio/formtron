"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const util_1 = require("util");
const readFile = util_1.promisify(fs.readFile);
const promisesCache = [];
exports.createFileLoader = () => node => {
    const promise = promisesCache[node.path];
    if (promise)
        return promise;
    promisesCache[node.path] = readFile(node.path, 'utf8');
    return promisesCache[node.path];
};
//# sourceMappingURL=file.js.map