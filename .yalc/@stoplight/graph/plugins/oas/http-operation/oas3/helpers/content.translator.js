"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const utils_1 = require("../../common/utils");
function translateEncodingPropertyObject(encodingPropertyObject, property) {
    const acceptableStyles = [
        "form",
        "spaceDelimited",
        "pipeDelimited",
        "deepObject",
    ];
    if (!acceptableStyles.includes(encodingPropertyObject.style)) {
        throw new Error(`Encoding property style: '${encodingPropertyObject.style}' is incorrect, must be one of: ${acceptableStyles}`);
    }
    return Object.assign({ property }, encodingPropertyObject, { style: encodingPropertyObject.style, mediaType: encodingPropertyObject.contentType, headers: utils_1.mapDict(encodingPropertyObject.headers, translateHeaderObject) });
}
function translateHeaderObject(headerObject, name) {
    return Object.assign({}, lodash_1.omit(headerObject, 'examples', 'example'), { name, style: "simple", content: lodash_1.mapValues(headerObject.content, translateMediaTypeObject) });
}
exports.translateHeaderObject = translateHeaderObject;
function translateMediaTypeObject({ schema, example, examples, encoding }, mediaType) {
    return {
        mediaType,
        schema,
        examples: lodash_1.compact(lodash_1.union(Array.of(example), examples)),
        encodings: utils_1.mapDict(encoding, translateEncodingPropertyObject),
    };
}
exports.translateMediaTypeObject = translateMediaTypeObject;
//# sourceMappingURL=content.translator.js.map