"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vfile = require("vfile");
const types_1 = require("../types");
exports.createDirectoryHook = (opts) => ({
    name: 'directory',
    nodeType: types_1.FilesystemTypes.DIRECTORY,
    recursive: opts.recursive !== false,
    selector: node => node.type === types_1.FilesystemTypes.DIRECTORY,
    onWillCreateNode: node => {
        const file = vfile({ path: node.path });
        node.name = file.stem;
        node.dirname = file.dirname;
    },
    onDidCreateNode: (parent, { createNode }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const children = yield parent.loadContent();
        const childDirectories = [];
        for (const child of children) {
            if (child.stats.isDirectory()) {
                childDirectories.push(createNode({
                    id: child.path,
                    type: types_1.FilesystemTypes.DIRECTORY,
                    path: child.path,
                }, {
                    parent,
                }));
            }
        }
        try {
            yield Promise.all(childDirectories);
        }
        catch (e) {
            console.error(`Error creating directory children for node '${parent.id}'`, e);
        }
    }),
});
//# sourceMappingURL=directory.js.map