"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function translateToContent(schema, mediaTypes) {
    return mediaTypes.reduce((contentDict, mediaType) => {
        contentDict[mediaType] = {
            mediaType,
            schema,
        };
        return contentDict;
    }, {});
}
exports.translateToContent = translateToContent;
//# sourceMappingURL=content.translator.js.map