import { IApiKeySecurityScheme, IBasicSecurityScheme, IBearerSecurityScheme, IOauth2SecurityScheme, IOpenIdConnectSecurityScheme } from '@stoplight/types';
import { OpenAPIObject, OperationObject, PathObject } from 'openapi3-ts';
import { Operation, Path, Spec } from 'swagger-schema-official';
export declare type HttpSecurityScheme = IApiKeySecurityScheme | IBearerSecurityScheme | IBasicSecurityScheme | IOauth2SecurityScheme | IOpenIdConnectSecurityScheme;
export interface ITranslateOperationOptions<O, P, S> {
    operation: O;
    method: string;
    pathObject: P;
    path: string;
    spec: S;
}
export declare type Oas2TranslateOperationOptions = ITranslateOperationOptions<Operation, Path, Spec>;
export declare type Oas3TranslateOperationOptions = ITranslateOperationOptions<OperationObject, PathObject, OpenAPIObject>;
