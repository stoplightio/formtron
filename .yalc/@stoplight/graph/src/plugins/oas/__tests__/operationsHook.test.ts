import { createOperationsHook } from '../shared';

describe('operationsHook', () => {
  const operationHook = createOperationsHook('oas2');

  const actions = {
    createEdge: jest.fn(),
    createNode: jest.fn(),
    getNode: jest.fn(),
    getParentNode: jest.fn(),
  };

  test('should not create an edge if no security scheme on top is provided', async () => {
    await operationHook.onDidCreateNode!(
      {
        id: 'node',
        type: 'nasino',
        loadContent: jest.fn(),
        content: {
          get: {
            security: [{ api_key: [] }],
          },
        },
      },
      actions
    );

    expect(actions.createEdge).not.toBeCalled();
  });
});
