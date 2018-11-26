import { IHttpContent } from '@stoplight/types';
import { ISchema } from '@stoplight/types/schema';
export declare function translateToContent(schema: ISchema, mediaTypes: string[]): {
    [mediaType: string]: IHttpContent;
};
