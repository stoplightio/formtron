"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const partial = require("lodash/partial");
const utils_1 = require("../../common/utils");
const params_translator_1 = require("./params.translator");
const toObject = (value, key) => ({ key, value });
function translateToResponse(produces, response, statusCode) {
    const headers = params_translator_1.translateToHeaderParams(response.headers || {}, produces);
    return {
        code: statusCode,
        description: response.description,
        headers,
        contents: produces.map(mediaType => ({
            mediaType,
            schema: response.schema,
            examples: utils_1.mapDict(response.examples, toObject),
        })),
    };
}
function translateToResponses(responses, produces) {
    return utils_1.mapDict(responses, partial(translateToResponse, produces));
}
exports.translateToResponses = translateToResponses;
//# sourceMappingURL=responses.translator.js.map