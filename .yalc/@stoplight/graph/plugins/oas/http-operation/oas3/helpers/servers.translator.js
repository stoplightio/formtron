"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const map = require("lodash/map");
const mapValues = require("lodash/mapValues");
function translateToServers(servers) {
    return map(servers, server => ({
        description: server.description,
        url: server.url,
        variables: mapValues(server.variables, (value) => ({
            default: String(value.default),
            description: String(value.default),
            enum: map(value.enum, String),
        })),
    }));
}
exports.translateToServers = translateToServers;
//# sourceMappingURL=servers.translator.js.map