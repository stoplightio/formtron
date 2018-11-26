import { translateToTags } from '../tag.translator';

describe('translateToTags', () => {
  test('should translate array of strings to tags', () => {
    expect(translateToTags(['a', 'b', 'c'])).toMatchSnapshot();
  });
});
