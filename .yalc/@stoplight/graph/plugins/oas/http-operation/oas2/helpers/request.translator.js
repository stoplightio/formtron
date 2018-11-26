"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guards_1 = require("./guards");
const params_translator_1 = require("./params.translator");
function translateToRequest(parameters, consumes) {
    return parameters.reduce((request, parameter) => {
        if (guards_1.isBodyParameter(parameter)) {
            request.body = params_translator_1.translateToBodyParameter(parameter, consumes);
        }
        else if (guards_1.isFormDataParameter(parameter)) {
            request.body = params_translator_1.translateToFormDataParameter(parameter, request.body, consumes);
        }
        else if (guards_1.isQueryParameter(parameter)) {
            const queryParameter = params_translator_1.translateToQueryParameter(parameter, consumes);
            request.query = (request.query || []).concat(queryParameter);
        }
        else if (guards_1.isPathParameter(parameter)) {
            const pathParameter = params_translator_1.translateToPathParameter(parameter, consumes);
            request.path = (request.path || []).concat(pathParameter);
        }
        else if (guards_1.isHeaderParameter(parameter)) {
            const headerParameter = params_translator_1.translateToHeaderParam(parameter, consumes);
            request.headers = (request.headers || []).concat(headerParameter);
        }
        return request;
    }, {});
}
exports.translateToRequest = translateToRequest;
//# sourceMappingURL=request.translator.js.map