"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hook_1 = require("./hook");
exports.createJsonPlugin = () => ({
    hooks: [hook_1.createJsonHook()],
});
//# sourceMappingURL=index.js.map