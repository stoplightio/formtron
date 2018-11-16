import { fieldName } from '..';

describe('formtron/fieldName', () => {
  test('plain', () => {
    const schema = {
      type: 'string',
    };
    const field = fieldName(schema);
    expect(field).toEqual('string');
  });
  test('array', () => {
    const schema = {
      type: 'array',
      items: {
        type: 'string',
      },
    };
    const field = fieldName(schema);
    expect(field).toEqual('string[]');
  });
  test('object', () => {
    const schema = {
      type: 'object',
      items: {
        type: 'string',
      },
    };
    const field = fieldName(schema);
    expect(field).toEqual('string{}');
  });
});
