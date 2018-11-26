"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const content_translator_1 = require("./content.translator");
function translateOas3RequestBody(requestBodyObject) {
    return {
        required: requestBodyObject.required,
        description: requestBodyObject.description,
        contents: lodash_1.map(requestBodyObject.content, content_translator_1.translateMediaTypeObject),
    };
}
function translateParameterObject(parameterObject) {
    return Object.assign({}, lodash_1.omit(parameterObject, 'in'), { content: lodash_1.mapValues(parameterObject.content, content_translator_1.translateMediaTypeObject) });
}
function translateOas3ToRequest(parameters, requestBodyObject) {
    return Object.assign({}, (requestBodyObject ? { body: translateOas3RequestBody(requestBodyObject) } : {}), lodash_1.mapValues(lodash_1.groupBy(parameters, 'in'), parameterObjects => lodash_1.map(parameterObjects, translateParameterObject)));
}
exports.translateOas3ToRequest = translateOas3ToRequest;
//# sourceMappingURL=request.translator.js.map