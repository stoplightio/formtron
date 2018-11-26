jest.mock('../../common/createHttpOperationHook');
import { Oas3RootNodeTypes } from '../../../types';
import { createHttpOperationHook, getMethod, getPath } from '../../common/createHttpOperationHook';
import { translateOperation } from '../helpers/operation.translator';

describe('httpOperationHook', () => {
  test('should export correct node type', () => {
    const { NODE_TYPE } = require('../hooks/httpOperationHook');
    expect(NODE_TYPE).toEqual('oas3_http_operation');
  });

  test('should create hook using correct parameters', () => {
    const { NODE_TYPE } = require('../hooks/httpOperationHook');
    expect(createHttpOperationHook).toHaveBeenCalledWith({
      getMethod,
      getPath,
      name: NODE_TYPE,
      nodeType: NODE_TYPE,
      selector: Oas3RootNodeTypes.OPERATION,
      translateOperation,
    });
  });
});
