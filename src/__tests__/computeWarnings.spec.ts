import { computeWarnings } from '..';

describe('formtron/computeWarnings', () => {
  describe('no ops = no warnings', () => {
    for (const i of ['simple', 'various-types', 'wildcards', 'complex']) {
      const data = require(`./examples/${i}/data.json`);
      test(`example ${i}`, () => {
        const warnings = computeWarnings(data, {
          redo: [],
          undo: [],
        });
        expect(warnings).toEqual([]);
      });
    }
  });
  describe('shouldnt warn', () => {
    for (const i of ['wildcards']) {
      const data = require(`./examples/${i}/data.json`);
      test(`example ${i}`, () => {
        const warnings = computeWarnings(data, {
          redo: [{ op: 'move', from: '#/paths/~1todos/get', path: '#/paths/~1lists/get' }],
          undo: [],
        });
        expect(warnings.length).toEqual(0);
      });
    }
  });
  describe('should warn', () => {
    for (const i of ['wildcards']) {
      const data = require(`./examples/${i}/data.json`);
      test(`example ${i}`, () => {
        const warnings = computeWarnings(data, {
          redo: [{ op: 'move', from: '#/paths/~1todos/get', path: '#/paths/~1lists/post' }],
          undo: [],
        });
        expect(warnings.length).toEqual(1);
      });
    }
  });
});
