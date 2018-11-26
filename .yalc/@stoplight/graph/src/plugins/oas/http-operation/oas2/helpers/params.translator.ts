import {
  HttpParamStyles,
  IHttpEncoding,
  IHttpHeaderParam,
  IHttpPathParam,
  IHttpQueryParam,
  IHttpRequestBody,
} from '@stoplight/types';
import partial = require('lodash/partial');
import {
  BodyParameter,
  FormDataParameter,
  Header,
  HeaderParameter,
  Parameter,
  PathParameter,
  QueryParameter,
} from 'swagger-schema-official';
import { mapDict } from '../../common/utils';
import { translateToContent } from './content.translator';

function chooseQueryParameterStyle(
  parameter: QueryParameter
): HttpParamStyles.PipeDelimited | HttpParamStyles.SpaceDelimited | HttpParamStyles.Form {
  /** Must cast to 'any' because this field is missing from the types but it's defined in the spec
   * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#parameterObject
   */
  switch ((parameter as any).collectionFormat) {
    case 'pipes':
      return HttpParamStyles.PipeDelimited;
    case 'ssv':
      return HttpParamStyles.SpaceDelimited;
    case 'csv':
    case 'multi':
    default:
      /**
       * This implementation is, in fact, not fully compliant with oas3.
       * As per oas3 spec: "Form style parameters defined by RFC6570.
       *                    This option replaces collectionFormat with a csv
       *                    (when explode is false) or multi (when explode is true)
       *                    value from OpenAPI 2.0."
       * But since there is no such property like 'explode' in oas2 we are defaulting to 'form'.
       */
      return HttpParamStyles.Form;
  }
}

function commonFields(parameter: Parameter) {
  return {
    description: parameter.description,
    required: parameter.required,
  };
}

function translatePartiallyToHeaderParam(mediaTypes: string[], header: Header, name: string): IHttpHeaderParam {
  return {
    description: header.description,
    // `required` not suppored by oas2
    name,
    content: translateToContent(header, mediaTypes),
    style: HttpParamStyles.Simple,
    // `deprecated` not supported by oas2
    // `explode` not supported by oas2,
  };
}

export function translateToHeaderParam(parameter: HeaderParameter, consumes: string[]): IHttpHeaderParam {
  return {
    required: parameter.required,
    ...translatePartiallyToHeaderParam(consumes, parameter, parameter.name),
  };
}

export function translateToHeaderParams(
  headers: { [headerName: string]: Header },
  consumes: string[]
): IHttpHeaderParam[] {
  return mapDict(headers, partial(translatePartiallyToHeaderParam, consumes));
}

export function translateToBodyParameter(parameter: BodyParameter, consumes: string[]): IHttpRequestBody {
  return {
    ...commonFields(parameter),
    contents: consumes.map(mediaType => ({
      mediaType,
      schema: parameter.schema,
      // 'encoding' not supported by oas2
      // 'examples' not supported by oas2
    })),
  };
}

export function translateToFormDataParameter(
  parameter: FormDataParameter,
  requestBody: IHttpRequestBody | null | undefined,
  consumes: string[]
): IHttpRequestBody {
  const requestBodyCopy: IHttpRequestBody = Object.assign(
    {},
    requestBody || {
      ...commonFields(parameter),
      contents: consumes.map(mediaType => ({
        mediaType,
        schema: parameter,
        // 'encoding' not supported by oas2
        // 'examples' not supported by oas2
      })),
    }
  );
  const bodyContent = requestBodyCopy.contents[0];
  const encoding: IHttpEncoding = {
    property: parameter.name,
    style: HttpParamStyles.Form,
    // `mediaType` not supported by oas2
    // `allowReserved` not supported by oas2
    // `explode` not supported by oas2
    // `mediaType` not supported by oas2
    // `headers` not supported by oas2
  };
  bodyContent.encodings = (bodyContent.encodings || []).concat(encoding);
  return requestBodyCopy;
}

export function translateToQueryParameter(parameter: QueryParameter, consumes: string[]): IHttpQueryParam {
  return {
    ...commonFields(parameter),
    allowEmptyValue: parameter.allowEmptyValue,
    name: parameter.name,
    content: translateToContent(parameter, consumes),
    style: chooseQueryParameterStyle(parameter),
    // `allowReserved` not supported by oas2
    // `deprecated` not supported by oas2
    // `explode` not supported by oas2,
  };
}

export function translateToPathParameter(parameter: PathParameter, consumes: string[]): IHttpPathParam {
  return {
    ...commonFields(parameter),
    name: parameter.name,
    content: translateToContent(parameter, consumes),
    // TODO(SL-248): as far as I can see in the oas3 spec simple is the only valid style, all other styles
    // defined in oas2 are obsolete (doubt: what about 'pipes', 'tsv' and 'ssv')
    style: HttpParamStyles.Simple,
    // `deprecated` not supported by oas2
    // `explode` not supported by oas2,
  };
}
