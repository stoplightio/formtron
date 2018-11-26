"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vfile = require("vfile");
const types_1 = require("../types");
exports.createFileHook = () => ({
    name: 'file',
    nodeType: types_1.FilesystemTypes.FILE,
    selector: node => node.type === types_1.FilesystemTypes.DIRECTORY,
    onWillCreateNode: node => {
        const file = vfile({ path: node.path });
        node.name = file.stem;
        node.contentType = file.extname ? file.extname.substr(1) : undefined;
        node.fileName = file.basename;
        node.dirname = file.dirname;
    },
    onDidCreateNode: (parent, { createNode }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const children = yield parent.loadContent();
        const childFiles = [];
        for (const child of children) {
            if (child.stats.isFile()) {
                childFiles.push(createNode({
                    id: child.path,
                    type: types_1.FilesystemTypes.FILE,
                    path: child.path,
                    stats: child.stats,
                }, {
                    parent,
                }));
            }
        }
        try {
            yield Promise.all(childFiles);
        }
        catch (e) {
            console.error(`Error creating file children for node '${parent.id}'`, e);
        }
    }),
});
//# sourceMappingURL=file.js.map