import { translateToContent } from '../helpers/content.translator';

describe('content.translator', () => {
  test('should translate a simple content', () => {
    expect(
      translateToContent(
        {
          any: 'key',
          works: 'fine',
        },
        ['application/json', 'text/plain']
      )
    ).toMatchSnapshot();
  });
});
