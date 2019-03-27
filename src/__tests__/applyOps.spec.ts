import { applyOps } from '..';

describe('formtron/applyOps', () => {
  test('no ops', () => {
    const data = {
      hello: 'world',
    };
    const modifiedData = applyOps(data, []);
    expect(modifiedData).toEqual(data);
  });
  test('add op', () => {
    const modifiedData = applyOps(
      {
        hello: 'world',
      },
      [
        {
          op: 'add',
          path: 'hello',
          value: 'WORLD',
        },
      ]
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
      [
        {
          op: 'move',
          from: 'hello',
          path: 'world',
        },
      ]
    );
    expect(modifiedData).toEqual({
      world: 'world',
      foo: 'bar',
    });
  });
  test('move op in place', () => {
    const modifiedData = applyOps(
      {
        hello: 'world',
        target: {
          foo: 'bar',
          hello: ['world'],
          bar: 'foo',
        },
        foo: 'bar',
      },
      [
        {
          op: 'move',
          from: 'target.hello',
          path: 'target.world',
        },
      ]
    );
    expect(modifiedData).toEqual({
      hello: 'world',
      target: {
        foo: 'bar',
        world: ['world'],
        bar: 'foo',
      },
      foo: 'bar',
    });
    // Assert that it renamed the property in-place.
    expect(Object.keys(modifiedData.target)).toEqual(['foo', 'world', 'bar']);
  });
  test('combine multiple ops', () => {
    const modifiedData = applyOps(
      {
        hello: 'world',
      },
      [
        {
          op: 'move',
          from: 'hello',
          path: 'world',
        },
        {
          op: 'add',
          path: 'world',
          value: 'hello',
        },
      ]
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
      [
        {
          op: 'move',
          from: 'universe.stars.0.planets.Pluto',
          path: 'universe.stars.0.dwarfplanets.Pluto',
        },
      ]
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
  test('update root', () => {
    const modifiedData = applyOps(
      {
        title: 'User',
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: "The user's full name.",
          },
          age: {
            type: 'number',
            minimum: 0,
            maximum: 150,
          },
        },
        required: ['name', 'age'],
      },
      [
        {
          op: 'add',
          path: '',
          value: {
            title: 'bar',
            foo: 'bar',
          },
        },
        {
          op: 'add',
          path: 'title',
          value: 'Hello',
        },
      ]
    );
    expect(modifiedData).toEqual({
      title: 'Hello',
      foo: 'bar',
    });
  });
});
