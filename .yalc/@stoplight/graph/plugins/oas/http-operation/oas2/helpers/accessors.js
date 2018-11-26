"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get = require("lodash/get");
const pick = require("lodash/pick");
const values = require("lodash/values");
const utils_1 = require("../../common/utils");
function getSecurities(operation, spec) {
    const globalSecuritySchemes = spec.security || [];
    const schemes = utils_1.uniqFlatMap(globalSecuritySchemes);
    const globalSecurity = values(pick(spec.securityDefinitions || {}, schemes));
    return operation.security || globalSecurity;
}
exports.getSecurities = getSecurities;
function getProducesOrConsumes(which, operation, spec) {
    const mimeTypes = get(operation, which, get(spec, which, []));
    return mimeTypes.length ? mimeTypes : ['*'];
}
function getProduces(operation, spec) {
    return getProducesOrConsumes('produces', operation, spec);
}
exports.getProduces = getProduces;
function getConsumes(operation, spec) {
    return getProducesOrConsumes('consumes', operation, spec);
}
exports.getConsumes = getConsumes;
//# sourceMappingURL=accessors.js.map