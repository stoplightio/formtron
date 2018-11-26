"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const utils_1 = require("../../common/utils");
function getOas3Securities(operation, spec) {
    const globalSchemes = utils_1.uniqFlatMap(spec.security);
    const operationSchemes = utils_1.uniqFlatMap(operation.security);
    return lodash_1.values(lodash_1.pick(lodash_1.get(spec, 'components.securitySchemes'), operation.security ? operationSchemes : globalSchemes));
}
exports.getOas3Securities = getOas3Securities;
//# sourceMappingURL=accessors.js.map