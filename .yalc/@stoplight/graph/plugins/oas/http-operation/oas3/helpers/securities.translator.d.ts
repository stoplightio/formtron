import { SecuritySchemeObject } from 'openapi3-ts';
import { HttpSecurityScheme } from '../../common/types';
export declare function translateOas3ToSecurities(securities: SecuritySchemeObject[]): HttpSecurityScheme[];
