import { IHttpHeaderParam, IHttpPathParam, IHttpQueryParam, IHttpRequestBody } from '@stoplight/types';
import { BodyParameter, FormDataParameter, Header, HeaderParameter, PathParameter, QueryParameter } from 'swagger-schema-official';
export declare function translateToHeaderParam(parameter: HeaderParameter, consumes: string[]): IHttpHeaderParam;
export declare function translateToHeaderParams(headers: {
    [headerName: string]: Header;
}, consumes: string[]): IHttpHeaderParam[];
export declare function translateToBodyParameter(parameter: BodyParameter, consumes: string[]): IHttpRequestBody;
export declare function translateToFormDataParameter(parameter: FormDataParameter, requestBody: IHttpRequestBody | null | undefined, consumes: string[]): IHttpRequestBody;
export declare function translateToQueryParameter(parameter: QueryParameter, consumes: string[]): IHttpQueryParam;
export declare function translateToPathParameter(parameter: PathParameter, consumes: string[]): IHttpPathParam;
