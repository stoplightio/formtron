import { INodeTag } from '@stoplight/types/node';

export function translateToTags(tags: string[]): INodeTag[] {
  return tags.map(tag => ({ name: tag }));
}
