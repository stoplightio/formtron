import { Security } from 'swagger-schema-official';
import { HttpSecurityScheme } from '../../common/types';
export declare function translateToSecurities(securities: Security[]): HttpSecurityScheme[];
