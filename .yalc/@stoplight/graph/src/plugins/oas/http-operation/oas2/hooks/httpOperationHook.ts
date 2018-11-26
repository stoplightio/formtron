import { Oas2SharedNodeTypes } from '../../../types';
import { createHttpOperationHook, getMethod, getPath } from '../../common/createHttpOperationHook';
import { translateOperation } from '../helpers/translators';

export const NODE_TYPE = 'oas2_http_operation';

export const httpOperationHook = createHttpOperationHook({
  getMethod,
  getPath,
  name: NODE_TYPE,
  nodeType: NODE_TYPE,
  selector: Oas2SharedNodeTypes.OPERATION,
  translateOperation,
});
