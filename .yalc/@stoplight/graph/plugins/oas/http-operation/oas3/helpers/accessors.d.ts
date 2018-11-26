import { OpenAPIObject, OperationObject, SecuritySchemeObject } from 'openapi3-ts';
export declare function getOas3Securities(operation: Partial<OperationObject>, spec: Partial<OpenAPIObject>): SecuritySchemeObject[];
