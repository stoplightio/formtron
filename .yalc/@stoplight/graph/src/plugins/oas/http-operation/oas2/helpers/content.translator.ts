import { IHttpContent } from '@stoplight/types';
import { ISchema } from '@stoplight/types/schema';

export function translateToContent(schema: ISchema, mediaTypes: string[]): { [mediaType: string]: IHttpContent } {
  return mediaTypes.reduce((contentDict, mediaType) => {
    contentDict[mediaType] = {
      mediaType,
      schema,
    };
    return contentDict;
  }, {});
}
