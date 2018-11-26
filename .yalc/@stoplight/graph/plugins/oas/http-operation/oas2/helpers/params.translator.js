"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const partial = require("lodash/partial");
const utils_1 = require("../../common/utils");
const content_translator_1 = require("./content.translator");
function chooseQueryParameterStyle(parameter) {
    switch (parameter.collectionFormat) {
        case 'pipes':
            return "pipeDelimited";
        case 'ssv':
            return "spaceDelimited";
        case 'csv':
        case 'multi':
        default:
            return "form";
    }
}
function commonFields(parameter) {
    return {
        description: parameter.description,
        required: parameter.required,
    };
}
function translatePartiallyToHeaderParam(mediaTypes, header, name) {
    return {
        description: header.description,
        name,
        content: content_translator_1.translateToContent(header, mediaTypes),
        style: "simple",
    };
}
function translateToHeaderParam(parameter, consumes) {
    return Object.assign({ required: parameter.required }, translatePartiallyToHeaderParam(consumes, parameter, parameter.name));
}
exports.translateToHeaderParam = translateToHeaderParam;
function translateToHeaderParams(headers, consumes) {
    return utils_1.mapDict(headers, partial(translatePartiallyToHeaderParam, consumes));
}
exports.translateToHeaderParams = translateToHeaderParams;
function translateToBodyParameter(parameter, consumes) {
    return Object.assign({}, commonFields(parameter), { contents: consumes.map(mediaType => ({
            mediaType,
            schema: parameter.schema,
        })) });
}
exports.translateToBodyParameter = translateToBodyParameter;
function translateToFormDataParameter(parameter, requestBody, consumes) {
    const requestBodyCopy = Object.assign({}, requestBody || Object.assign({}, commonFields(parameter), { contents: consumes.map(mediaType => ({
            mediaType,
            schema: parameter,
        })) }));
    const bodyContent = requestBodyCopy.contents[0];
    const encoding = {
        property: parameter.name,
        style: "form",
    };
    bodyContent.encodings = (bodyContent.encodings || []).concat(encoding);
    return requestBodyCopy;
}
exports.translateToFormDataParameter = translateToFormDataParameter;
function translateToQueryParameter(parameter, consumes) {
    return Object.assign({}, commonFields(parameter), { allowEmptyValue: parameter.allowEmptyValue, name: parameter.name, content: content_translator_1.translateToContent(parameter, consumes), style: chooseQueryParameterStyle(parameter) });
}
exports.translateToQueryParameter = translateToQueryParameter;
function translateToPathParameter(parameter, consumes) {
    return Object.assign({}, commonFields(parameter), { name: parameter.name, content: content_translator_1.translateToContent(parameter, consumes), style: "simple" });
}
exports.translateToPathParameter = translateToPathParameter;
//# sourceMappingURL=params.translator.js.map