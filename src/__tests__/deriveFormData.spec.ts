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

  describe('bad data', () => {
    for (const i of ['simple']) {
      const schema = require(`./examples/${i}/schema.json`);
      const data = require(`./examples/${i}/data.json`);
      // Corrupt data
      delete data.age;
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
});
