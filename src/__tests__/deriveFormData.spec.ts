import { deriveFormData } from '..';

describe('formtron/deriveFormData', () => {
  describe('bad selection', () => {
    for (const i of ['wildcards']) {
      const schema = require(`./examples/${i}/schema.json`);
      const data = require(`./examples/${i}/data.json`);
      test(`example ${i}`, () => {
        let e = null;
        try {
          deriveFormData(schema, data, data._selection.slice(0, 1));
        } catch (err) {
          e = err;
        }
        expect(e).not.toBeNull();
      });
    }
  });
  describe('update root', () => {
    const schema = require(`./examples/root/schema.json`);
    const data = require(`./examples/root/data.json`);
    test('empty selection', () => {
      const formdata = deriveFormData(schema, data, '');
      expect(formdata['']).toEqual(data);
    });
  });
});
