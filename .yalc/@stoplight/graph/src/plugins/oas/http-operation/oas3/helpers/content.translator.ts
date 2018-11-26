import { HttpParamStyles, IExample, IHttpContent, IHttpEncoding, IHttpHeaderParam } from '@stoplight/types';
import { compact, mapValues, omit, union } from 'lodash';
import { EncodingPropertyObject, HeaderObject, MediaTypeObject } from 'openapi3-ts';
import { mapDict } from '../../common/utils';

function translateEncodingPropertyObject(
  encodingPropertyObject: EncodingPropertyObject,
  property: string
): IHttpEncoding {
  const acceptableStyles: Array<string | undefined> = [
    HttpParamStyles.Form,
    HttpParamStyles.SpaceDelimited,
    HttpParamStyles.PipeDelimited,
    HttpParamStyles.DeepObject,
  ];

  if (!acceptableStyles.includes(encodingPropertyObject.style)) {
    throw new Error(
      `Encoding property style: '${encodingPropertyObject.style}' is incorrect, must be one of: ${acceptableStyles}`
    );
  }

  return {
    property,
    ...encodingPropertyObject,
    // workaround for 'style' being one of the accepted HttpParamStyles
    style: encodingPropertyObject.style as any,
    mediaType: encodingPropertyObject.contentType,
    headers: mapDict(encodingPropertyObject.headers, translateHeaderObject),
  };
}

export function translateHeaderObject(headerObject: HeaderObject, name: string): IHttpHeaderParam {
  return {
    // TODO(SL-249): we are missing examples in our types, on purpose?
    // examples: parameterObject.examples,
    ...omit(headerObject, 'examples', 'example'),
    name,
    style: HttpParamStyles.Simple,
    content: mapValues(headerObject.content, translateMediaTypeObject),
  };
}

export function translateMediaTypeObject(
  { schema, example, examples, encoding }: MediaTypeObject,
  mediaType: string
): IHttpContent {
  return {
    mediaType,
    schema,
    // Note that I'm assuming all references are resolved
    examples: compact(union(Array.of(example), examples)) as IExample[],
    encodings: mapDict(encoding, translateEncodingPropertyObject),
  };
}
