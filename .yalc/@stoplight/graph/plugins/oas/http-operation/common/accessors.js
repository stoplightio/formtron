"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unionBy = require("lodash/unionBy");
function getOasParameters(operationParameters, pathParameters) {
    return unionBy(operationParameters, pathParameters, (parameter) => `${parameter.name}-${parameter.in}`);
}
exports.getOasParameters = getOasParameters;
//# sourceMappingURL=accessors.js.map