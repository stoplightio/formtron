"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const directory_1 = require("./hooks/directory");
const file_1 = require("./hooks/file");
const directory_2 = require("./loaders/directory");
const file_2 = require("./loaders/file");
const types_1 = require("./types");
tslib_1.__exportStar(require("./types"), exports);
exports.createFilesystemPlugin = (opts = {}) => ({
    hooks: [file_1.createFileHook(), directory_1.createDirectoryHook(opts)],
    loaders: {
        [types_1.FilesystemTypes.FILE]: file_2.createFileLoader(),
        [types_1.FilesystemTypes.DIRECTORY]: directory_2.createDirectoryLoader(),
    },
});
//# sourceMappingURL=index.js.map