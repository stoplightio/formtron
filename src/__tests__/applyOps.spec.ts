import { applyOps } from '..';

describe('formtron/applyOps', () => {
  test('no ops', () => {
    const data = {
      hello: 'world',
    };
    const modifiedData = applyOps(data, { redo: [], undo: [] });
    expect(modifiedData).toEqual(data);
  });
  test('add op', () => {
    const modifiedData = applyOps(
      {
        hello: 'world',
      },
      {
        redo: [
          {
            op: 'add',
            path: '#/hello',
            value: 'WORLD',
          },
        ],
        undo: [],
      }
    );
    expect(modifiedData).toEqual({
      hello: 'WORLD',
    });
  });
  test('move op', () => {
    const modifiedData = applyOps(
      {
        hello: 'world',
        foo: 'bar',
      },
      {
        redo: [
          {
            op: 'move',
            from: '#/hello',
            path: '#/world',
          },
        ],
        undo: [],
      }
    );
    expect(modifiedData).toEqual({
      world: 'world',
      foo: 'bar',
    });
  });
  test('combine multiple ops', () => {
    const modifiedData = applyOps(
      {
        hello: 'world',
      },
      {
        redo: [
          {
            op: 'move',
            from: '#/hello',
            path: '#/world',
          },
          {
            op: 'add',
            path: '#/world',
            value: 'hello',
          },
        ],
        undo: [],
      }
    );
    expect(modifiedData).toEqual({
      world: 'hello',
    });
  });
  test('deep structures', () => {
    const modifiedData = applyOps(
      {
        hello: 'world',
        universe: {
          stars: [
            {
              sun: 'Sol',
              planets: {
                Pluto: {},
                Mercury: {},
                Venus: {},
                Earth: {},
                Mars: {},
              },
              dwarfplanets: {},
            },
          ],
        },
      },
      {
        redo: [
          {
            op: 'move',
            from: '#/universe/stars/0/planets/Pluto',
            path: '#/universe/stars/0/dwarfplanets/Pluto',
          },
        ],
        undo: [],
      }
    );
    expect(modifiedData).toEqual({
      hello: 'world',
      universe: {
        stars: [
          {
            sun: 'Sol',
            planets: {
              Mercury: {},
              Venus: {},
              Earth: {},
              Mars: {},
            },
            dwarfplanets: {
              Pluto: {},
            },
          },
        ],
      },
    });
  });
});
