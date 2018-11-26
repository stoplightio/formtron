import { get, pick, values } from 'lodash';
import { OpenAPIObject, OperationObject, SecuritySchemeObject } from 'openapi3-ts';
import { uniqFlatMap } from '../../common/utils';

export function getOas3Securities(
  operation: Partial<OperationObject>,
  spec: Partial<OpenAPIObject>
): SecuritySchemeObject[] {
  const globalSchemes = uniqFlatMap(spec.security);
  const operationSchemes = uniqFlatMap(operation.security);
  return values(pick(get(spec, 'components.securitySchemes'), operation.security ? operationSchemes : globalSchemes));
}
