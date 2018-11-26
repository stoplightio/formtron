"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path_1 = require("path");
const util_1 = require("util");
const readdir = util_1.promisify(fs.readdir);
const stat = util_1.promisify(fs.stat);
const promisesCache = [];
exports.createDirectoryLoader = () => node => {
    const promise = promisesCache[node.path];
    if (promise)
        return promise;
    promisesCache[node.path] = readdir(node.path, 'utf8').then(paths => {
        return Promise.all(paths.map(p => {
            const absolutePath = path_1.resolve(node.path, p);
            return stat(absolutePath).then(stats => ({
                name: p,
                path: absolutePath,
                stats,
            }));
        }));
    });
    return promisesCache[node.path];
};
//# sourceMappingURL=directory.js.map