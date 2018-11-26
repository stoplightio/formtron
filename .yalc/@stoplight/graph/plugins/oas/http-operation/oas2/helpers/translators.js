"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isNull = require("lodash/isNull");
const omitBy = require("lodash/omitBy");
const URI = require("urijs");
const accessors_1 = require("../../common/accessors");
const tag_translator_1 = require("../../common/tag.translator");
const accessors_2 = require("./accessors");
const request_translator_1 = require("./request.translator");
const responses_translator_1 = require("./responses.translator");
const securities_translator_1 = require("./securities.translator");
function translateToServers(operation, spec) {
    const schemes = operation.schemes || spec.schemes || [];
    const { host, basePath } = spec;
    if (!host || !basePath) {
        return [];
    }
    return schemes.map(scheme => {
        return {
            url: URI()
                .scheme(scheme)
                .host(host)
                .path(basePath)
                .toString(),
        };
    });
}
exports.translateToServers = translateToServers;
function translateOperation(opts) {
    const { operation, method, path, pathObject, spec } = opts;
    const produces = accessors_2.getProduces(operation, spec);
    const consumes = accessors_2.getConsumes(operation, spec);
    const httpOperation = {
        id: '?http-operation-id?',
        iid: operation.operationId,
        description: operation.description,
        deprecated: operation.deprecated,
        method,
        path,
        summary: operation.summary,
        responses: responses_translator_1.translateToResponses(operation.responses, produces),
        servers: translateToServers(operation, spec),
        request: request_translator_1.translateToRequest(accessors_1.getOasParameters(operation.parameters, pathObject.parameters), consumes),
        tags: tag_translator_1.translateToTags(operation.tags || []),
        security: securities_translator_1.translateToSecurities(accessors_2.getSecurities(operation, spec)),
    };
    return omitBy(httpOperation, isNull);
}
exports.translateOperation = translateOperation;
//# sourceMappingURL=translators.js.map