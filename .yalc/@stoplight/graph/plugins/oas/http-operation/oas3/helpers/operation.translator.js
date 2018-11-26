"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const accessors_1 = require("../../common/accessors");
const tag_translator_1 = require("../../common/tag.translator");
const accessors_2 = require("./accessors");
const request_translator_1 = require("./request.translator");
const responses_translator_1 = require("./responses.translator");
const securities_translator_1 = require("./securities.translator");
const servers_translator_1 = require("./servers.translator");
function translateOperation(opts) {
    const { operation, method, path, pathObject, spec } = opts;
    return {
        id: '?http-oas3-operation-id?',
        iid: operation.operationId,
        description: operation.description,
        deprecated: operation.deprecated,
        method,
        path,
        summary: operation.summary,
        responses: responses_translator_1.translateToOas3Responses(operation.responses),
        servers: servers_translator_1.translateToServers(operation.servers || pathObject.servers || spec.servers),
        request: request_translator_1.translateOas3ToRequest(accessors_1.getOasParameters(operation.parameters, pathObject.parameters), operation.requestBody),
        tags: tag_translator_1.translateToTags(operation.tags || []),
        security: securities_translator_1.translateOas3ToSecurities(accessors_2.getOas3Securities(operation, spec)),
    };
}
exports.translateOperation = translateOperation;
//# sourceMappingURL=operation.translator.js.map