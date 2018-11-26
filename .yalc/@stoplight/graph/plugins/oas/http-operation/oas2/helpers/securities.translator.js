"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compact = require("lodash/compact");
function translateToFlows(security) {
    const tokenAndScope = {
        tokenUrl: security.tokenUrl,
        scopes: security.scopes,
    };
    const flowsDict = {
        implicit: ['implicit', { scopes: [], authorizationUrl: security.authorizationUrl }],
        password: ['password', tokenAndScope],
        application: ['clientCredentials', tokenAndScope],
        accessCode: ['authorizationCode', Object.assign({}, tokenAndScope, { authorizationUrl: security.authorizationUrl })],
    };
    const flow = flowsDict[security.flow];
    return flow ? { [flow[0]]: flow[1] } : {};
}
function translateToBasicSecurityScheme(security) {
    return {
        type: 'http',
        scheme: 'basic',
        description: security.description,
    };
}
function translateToApiKeySecurityScheme(security) {
    const acceptableSecurityOrigins = ['query', 'header', 'cookie'];
    if (!acceptableSecurityOrigins.includes(security.in)) {
        throw new Error(`Provided security origin (the 'in' property): '${security.in}' is not valid. Should be one of the following: ${acceptableSecurityOrigins}`);
    }
    return {
        type: 'apiKey',
        name: security.name,
        in: security.in,
        description: security.description,
    };
}
function translateToOauth2SecurityScheme(security) {
    return {
        type: 'oauth2',
        flows: translateToFlows(security),
        description: security.description,
    };
}
function translateToSingleSecurity(security) {
    switch (security.type) {
        case 'basic':
            return translateToBasicSecurityScheme(security);
        case 'apiKey':
            return translateToApiKeySecurityScheme(security);
        case 'oauth2':
            return translateToOauth2SecurityScheme(security);
    }
    return null;
}
function translateToSecurities(securities) {
    return compact(securities.map(translateToSingleSecurity));
}
exports.translateToSecurities = translateToSecurities;
//# sourceMappingURL=securities.translator.js.map