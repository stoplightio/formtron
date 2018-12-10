import { applyOps, computeOps, deriveFormData } from '..';

describe('formtron/e2e', () => {
  const data = require(`./examples/dependent-variables/data.json`);
  const schemaA = require(`./examples/dependent-variables/schemaA.json`);
  const schemaB = require(`./examples/dependent-variables/schemaB.json`);
  test(`equivalent triple op`, () => {
    const formDataA: any = deriveFormData(schemaA, data, data._selection);
    formDataA['paths.*.?'] = 'post';
    formDataA['paths.?.*'] = '/new/path';
    formDataA['paths.*.*.tags'] = 'taggy';
    const opsA = computeOps(schemaA, data, data._selection, formDataA);
    expect(opsA.redo.length).toEqual(4);

    const formDataB: any = deriveFormData(schemaB, data, data._selection);
    formDataB['paths.*.?'] = 'post';
    formDataB['paths.?.*'] = '/new/path';
    formDataB['paths.*.*.tags'] = 'taggy';
    const opsB = computeOps(schemaB, data, data._selection, formDataB);
    expect(opsB.redo.length).toEqual(3);

    const dataA = applyOps(data, opsA);
    const dataB = applyOps(data, opsB);
    expect(dataA).toEqual(dataB);
  });
});
