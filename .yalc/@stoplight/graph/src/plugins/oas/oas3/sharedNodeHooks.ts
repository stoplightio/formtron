import { createSharedNodeHook } from '../shared';
import { Oas3SharedNodeTypes, OasNodeChildType } from '../types';

export const headersHook = createSharedNodeHook('headers', OasNodeChildType.OBJECT, Oas3SharedNodeTypes.HEADERS);
export const schemasHook = createSharedNodeHook('schemas', OasNodeChildType.OBJECT, Oas3SharedNodeTypes.SCHEMAS);
export const responsesHook = createSharedNodeHook('responses', OasNodeChildType.OBJECT, Oas3SharedNodeTypes.RESPONSES);
export const linksHook = createSharedNodeHook('links', OasNodeChildType.OBJECT, Oas3SharedNodeTypes.LINKS);
export const callbacksHook = createSharedNodeHook('callbacks', OasNodeChildType.OBJECT, Oas3SharedNodeTypes.CALLBACKS);
export const examplesHook = createSharedNodeHook('examples', OasNodeChildType.OBJECT, Oas3SharedNodeTypes.EXAMPLES);

export const requestBodiesHook = createSharedNodeHook(
  'requestBodies',
  OasNodeChildType.OBJECT,
  Oas3SharedNodeTypes.REQUEST_BODIES
);

export const securitySchemesHook = createSharedNodeHook(
  'securitySchemes',
  OasNodeChildType.OBJECT,
  Oas3SharedNodeTypes.SECURITY_SCHEMES
);
