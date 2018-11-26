import { createContainerElementHooks } from '../shared';
import { Oas2ChildNodeTypes, Oas2RootNodeTypes, OasNodeChildType } from '../types';

export const securitySchemeHooks = createContainerElementHooks(
  Oas2RootNodeTypes.SECURITY_SCHEMES,
  Oas2ChildNodeTypes.SECURITY_SCHEME,
  OasNodeChildType.OBJECT,
  'securityDefinitions'
);

export const pathsHooks = createContainerElementHooks(
  Oas2RootNodeTypes.PATHS,
  Oas2ChildNodeTypes.PATH,
  OasNodeChildType.OBJECT,
  'paths'
);

export const tagsHook = createContainerElementHooks(
  Oas2RootNodeTypes.TAGS,
  Oas2ChildNodeTypes.TAG,
  OasNodeChildType.ARRAY,
  'tags'
);
