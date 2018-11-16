import { computeOps, deriveFormData } from '..';

describe('formtron/computeOps', () => {
  describe('no ops', () => {
    for (const i of ['simple', 'various-types', 'wildcards', 'complex']) {
      const schema = require(`./examples/${i}/schema.json`);
      const data = require(`./examples/${i}/data.json`);
      test(`example ${i}`, () => {
        const formData = deriveFormData(schema, data, data._selection);
        const ops = computeOps(schema, data, data._selection, formData);
        expect(ops).toEqual([]);
      });
    }
  });
  describe('single op', () => {
    for (const i of ['simple', 'various-types', 'wildcards', 'complex']) {
      const schema = require(`./examples/${i}/schema.json`);
      const data = require(`./examples/${i}/data.json`);
      test(`example ${i}`, () => {
        const formData = deriveFormData(schema, data, data._selection);
        const key = Object.keys(schema.fields)[0];
        formData[key] = 'foo';
        let ops = computeOps(schema, data, data._selection, formData);
        ops = ops.filter(op => op.op !== 'select');
        expect(ops.length).toEqual(1);
      });
    }
  });
  describe('triple op', () => {
    const data = require(`./examples/dependent-variables/data.json`);
    const schemaA = require(`./examples/dependent-variables/schemaA.json`);
    const schemaB = require(`./examples/dependent-variables/schemaB.json`);
    test(`schema A`, () => {
      const formData: any = deriveFormData(schemaA, data, data._selection);
      formData['paths.*.?'] = 'post';
      formData['paths.?.*'] = '/new/path';
      formData['paths.*.*.tags'] = 'taggy';
      let ops = computeOps(schemaA, data, data._selection, formData);
      ops = ops.filter(op => op.op !== 'select');
      expect(ops.length).toEqual(2);
      expect(ops).toEqual([
        { op: 'add', path: 'paths./api.get.tags', value: 'taggy' },
        { op: 'move', from: 'paths./api.get', path: 'paths./new/path.post' },
      ]);
    });
    test(`schema B`, () => {
      const formData: any = deriveFormData(schemaB, data, data._selection);
      formData['paths.*.?'] = 'post';
      formData['paths.?.*'] = '/new/path';
      formData['paths.*.*.tags'] = 'taggy';
      let ops = computeOps(schemaB, data, data._selection, formData);
      ops = ops.filter(op => op.op !== 'select');
      expect(ops.length).toEqual(2);
      expect(ops).toEqual([
        { op: 'add', path: 'paths./api.get.tags', value: 'taggy' },
        { op: 'move', from: 'paths./api.get', path: 'paths./new/path.post' },
      ]);
    });
  });
  describe('deep comparison', () => {
    test('json type', () => {
      const schema = require(`./examples/complex/schema.json`);
      const data = require(`./examples/complex/data.json`);
      const formData = deriveFormData(schema, data, data._selection);
      const clonedData = JSON.parse(JSON.stringify(data));
      const ops = computeOps(schema, clonedData, data._selection, formData);
      expect(ops).toEqual([]);
    });
  });
});
