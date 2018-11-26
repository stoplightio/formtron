"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../common/utils");
const content_translator_1 = require("./content.translator");
function translateToOas3Response(response, statusCode) {
    return {
        code: statusCode,
        description: response.description,
        headers: utils_1.mapDict(response.headers, content_translator_1.translateHeaderObject),
        contents: utils_1.mapDict(response.content, content_translator_1.translateMediaTypeObject),
    };
}
function translateToOas3Responses(responses) {
    return utils_1.mapDict(responses, translateToOas3Response);
}
exports.translateToOas3Responses = translateToOas3Responses;
//# sourceMappingURL=responses.translator.js.map