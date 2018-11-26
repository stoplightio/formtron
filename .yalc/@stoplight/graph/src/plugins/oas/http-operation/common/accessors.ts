import unionBy = require('lodash/unionBy');

export function getOasParameters<ParamType extends { name: string; in: string }>(
  operationParameters: ParamType[] | undefined,
  pathParameters: ParamType[] | undefined
) {
  return unionBy(operationParameters, pathParameters, (parameter: ParamType) => `${parameter.name}-${parameter.in}`);
}
