import { applyOps, computeOps, deriveFormData } from '..';

describe('formtron/transform', () => {
  describe('preserves identity property of JSON', () => {
    for (const i of ['simple', 'various-types', 'wildcards', 'complex']) {
      const schema = require(`./examples/${i}/schema.json`);
      const data = require(`./examples/${i}/data.json`);
      test(`example ${i}`, () => {
        const formData = deriveFormData(schema, data, data._selection);
        const ops = computeOps(schema, data, data._selection, formData);
        const modifiedData = applyOps(data, ops);
        expect(data).toEqual(modifiedData);
      });
    }
  });
});
