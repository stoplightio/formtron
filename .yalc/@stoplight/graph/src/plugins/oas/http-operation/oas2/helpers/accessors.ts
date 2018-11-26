import get = require('lodash/get');
import pick = require('lodash/pick');
import values = require('lodash/values');
import { Operation, Security, Spec } from 'swagger-schema-official';
import { uniqFlatMap } from '../../common/utils';

export function getSecurities(operation: Partial<Operation>, spec: Partial<Spec>): Security[] {
  const globalSecuritySchemes = spec.security || [];
  const schemes = uniqFlatMap(globalSecuritySchemes);
  const globalSecurity = values(pick(spec.securityDefinitions || {}, schemes));
  return operation.security || globalSecurity;
}

function getProducesOrConsumes(which: 'produces' | 'consumes', operation: Partial<Operation>, spec: Partial<Spec>) {
  const mimeTypes = get(operation, which, get(spec, which, [])) as string[];
  return mimeTypes.length ? mimeTypes : ['*'];
}

export function getProduces(operation: Partial<Operation>, spec: Partial<Spec>) {
  return getProducesOrConsumes('produces', operation, spec);
}

export function getConsumes(operation: Partial<Operation>, spec: Partial<Spec>) {
  return getProducesOrConsumes('consumes', operation, spec);
}
