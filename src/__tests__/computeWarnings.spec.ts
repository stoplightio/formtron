import { computeWarnings } from '..';

describe('formtron/computeOps', () => {
  describe('no ops = no warnings', () => {
    for (const i of ['simple', 'various-types', 'wildcards', 'complex']) {
      const data = require(`./examples/${i}/data.json`);
      test(`example ${i}`, () => {
        const warnings = computeWarnings(data, []);
        expect(warnings).toEqual([]);
      });
    }
  });
  describe('shouldnt warn', () => {
    for (const i of ['wildcards']) {
      const data = require(`./examples/${i}/data.json`);
      test(`example ${i}`, () => {
        const warnings = computeWarnings(data, [{ op: 'move', from: 'paths./todos.get', path: 'paths./lists.get' }]);
        expect(warnings.length).toEqual(0);
      });
    }
  });
  describe('should warn', () => {
    for (const i of ['wildcards']) {
      const data = require(`./examples/${i}/data.json`);
      test(`example ${i}`, () => {
        const warnings = computeWarnings(data, [{ op: 'move', from: 'paths./todos.get', path: 'paths./lists.post' }]);
        expect(warnings.length).toEqual(1);
      });
    }
  });
});
