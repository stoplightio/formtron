import {
  IApiKeySecurityScheme,
  IBasicSecurityScheme,
  IOauth2SecurityScheme,
  IOauthFlowObjects,
} from '@stoplight/types';
import { ApiKeySecurity, BaseOAuthSecuirty, Security } from 'swagger-schema-official';
import { HttpSecurityScheme } from '../../common/types';

import compact = require('lodash/compact');

/**
 * @param security the union with 'any' is purposeful. Passing strict types does not help much here,
 * because all these checks happen in runtime. I'm leaving 'Security' only for visibility.
 */
function translateToFlows(security: Security | any): IOauthFlowObjects {
  const tokenAndScope = {
    tokenUrl: security.tokenUrl,
    scopes: security.scopes,
  };

  const flowsDict = {
    implicit: ['implicit', { scopes: [], authorizationUrl: security.authorizationUrl }],
    password: ['password', tokenAndScope],
    application: ['clientCredentials', tokenAndScope],
    accessCode: ['authorizationCode', { ...tokenAndScope, authorizationUrl: security.authorizationUrl }],
  };

  const flow = flowsDict[security.flow];
  return flow ? { [flow[0]]: flow[1] } : {};
}

function translateToBasicSecurityScheme(security: Security): IBasicSecurityScheme {
  return {
    type: 'http',
    scheme: 'basic',
    description: security.description,
  };
}

function translateToApiKeySecurityScheme(security: ApiKeySecurity): IApiKeySecurityScheme {
  const acceptableSecurityOrigins = ['query', 'header', 'cookie'];
  if (!acceptableSecurityOrigins.includes(security.in)) {
    throw new Error(
      `Provided security origin (the 'in' property): '${
        security.in
      }' is not valid. Should be one of the following: ${acceptableSecurityOrigins}`
    );
  }
  return {
    type: 'apiKey',
    name: security.name,
    in: security.in as 'query' | 'header' | 'cookie',
    description: security.description,
  };
}

function translateToOauth2SecurityScheme(security: BaseOAuthSecuirty): IOauth2SecurityScheme {
  return {
    type: 'oauth2',
    flows: translateToFlows(security),
    description: security.description,
  };
}

function translateToSingleSecurity(security: Security) {
  switch (security.type) {
    case 'basic':
      return translateToBasicSecurityScheme(security);
    case 'apiKey':
      return translateToApiKeySecurityScheme(security as ApiKeySecurity);
    case 'oauth2':
      return translateToOauth2SecurityScheme(security as BaseOAuthSecuirty);
  }
  return null;
}

export function translateToSecurities(securities: Security[]): HttpSecurityScheme[] {
  return compact(securities.map(translateToSingleSecurity));
}
