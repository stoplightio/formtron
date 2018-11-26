import { IHttpResponse } from '@stoplight/types';
import partial = require('lodash/partial');
import { Response } from 'swagger-schema-official';
import { mapDict } from '../../common/utils';
import { translateToHeaderParams } from './params.translator';

const toObject = <T>(value: T, key: string) => ({ key, value });

function translateToResponse(produces: string[], response: Response, statusCode: string) {
  const headers = translateToHeaderParams(response.headers || {}, produces);
  return {
    code: statusCode,
    description: response.description,
    headers,
    contents: produces.map(mediaType => ({
      mediaType,
      schema: response.schema,
      examples: mapDict(response.examples, toObject),
      // `encoding` is not supported
    })),
    // `links` not supported by oas2
  } as IHttpResponse;
}

export function translateToResponses(responses: { [name: string]: Response }, produces: string[]): IHttpResponse[] {
  return mapDict(responses, partial(translateToResponse, produces));
}
