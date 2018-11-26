import { SecuritySchemeObject } from 'openapi3-ts';
import { HttpSecurityScheme } from '../../common/types';

export function translateOas3ToSecurities(securities: SecuritySchemeObject[]): HttpSecurityScheme[] {
  // return compact(
  //   map(securities, security => {
  //     const common: any = pick(security, ['type', 'description']);
  //     switch (security.type) {
  //       case 'http':
  //         return {
  //           ...common,
  //           scheme: security.scheme,
  //         } as IBasicSecurityScheme;
  //       case 'apiKey':
  //         return {
  //           ...common,
  //           name: security.name,
  //           in: security.in,
  //         } as IApiKeySecurityScheme;
  //       case 'oauth2':
  //         return {
  //           ...common,
  //           flows: security.flows,
  //         } as IOauth2SecurityScheme;
  //       case 'openIdConnect':
  //         return {
  //           ...common,
  //           openIdConnectUrl: security.openIdConnectUrl,
  //         } as IOpenIdConnectSecurityScheme;
  //     }
  //     return null;
  //   })
  // );

  // TODO(SL-249): see the implementation above. I'm basically assigning one property to another.
  // Instead I think it's fine to just 'assume' these types match.
  // This may of course become WRONG at some point of course but a proper test suite should pick that up.
  // I will leave this until reviewers take a look.
  return securities as HttpSecurityScheme[];
}
