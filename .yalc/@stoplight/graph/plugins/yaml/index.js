"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hook_1 = require("./hook");
exports.createYamlPlugin = () => ({
    hooks: [hook_1.createYamlHook()],
});
//# sourceMappingURL=index.js.map