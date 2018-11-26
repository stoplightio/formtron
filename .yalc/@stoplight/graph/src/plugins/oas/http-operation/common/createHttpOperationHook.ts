import { IHttpOperation } from '@stoplight/types';
import { IGraphHook, IGraphHookApi, INodeInstance, INodeOptions } from '../../../..';
import { ITranslateOperationOptions } from './types';

interface IHttpOperationHookConfig<Operation, Path, Spec> {
  name: string;
  nodeType: string;
  selector: string;
  getPath: Function;
  getMethod: Function;
  translateOperation: (opts: ITranslateOperationOptions<Operation, Path, Spec>) => IHttpOperation;
}

type GraphHookApi<T> = IGraphHookApi<INodeOptions, INodeInstance<IHttpOperation>, INodeInstance<T>>;
type GraphHook<T> = IGraphHook<INodeOptions, INodeInstance<IHttpOperation>, INodeInstance<T>>;

export const getMethod = ({ id }: INodeInstance): string => id.slice(id.lastIndexOf('_') + 1);
export const getPath = ({ id }: INodeInstance) => id;

export function createHttpOperationHook<Operation, Path, Spec>(
  config: IHttpOperationHookConfig<Operation, Path, Spec>
): GraphHook<Operation> {
  return {
    name: config.name,
    nodeType: config.nodeType,
    selector: config.selector,
    async onDidCreateNode(operationNode: INodeInstance<Operation>, options: GraphHookApi<Operation>): Promise<any> {
      if (!operationNode.content) {
        return;
      }
      const pathNode = options.getParentNode(operationNode);
      if (!pathNode || !pathNode.content) {
        return;
      }
      const pathsNode = options.getParentNode(pathNode);
      if (!pathsNode) {
        return;
      }
      const specNode = options.getParentNode(pathsNode);
      if (!specNode || !specNode.content) {
        return;
      }
      options.createNode(
        {
          id: `${operationNode.id}-${config.nodeType}`,
          type: config.nodeType,
          content: config.translateOperation({
            operation: operationNode.content,
            pathObject: pathNode.content as Path,
            spec: specNode.content as Spec,
            method: config.getMethod(operationNode),
            path: config.getPath(pathNode),
          }),
        },
        {
          parent: operationNode,
        }
      );
    },
  };
}
