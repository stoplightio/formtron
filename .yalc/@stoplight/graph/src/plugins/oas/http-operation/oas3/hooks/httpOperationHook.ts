import { Oas3RootNodeTypes } from '../../../types';
import { createHttpOperationHook, getMethod, getPath } from '../../common/createHttpOperationHook';
import { translateOperation } from '../helpers/operation.translator';

export const NODE_TYPE = 'oas3_http_operation';

export const httpOperationHook = createHttpOperationHook({
  getMethod,
  getPath,
  name: NODE_TYPE,
  nodeType: NODE_TYPE,
  selector: Oas3RootNodeTypes.OPERATION,
  translateOperation,
});
