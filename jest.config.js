module.exports = {
  preset: '@stoplight/scripts',
  coveragePathIgnorePatterns: ['.tsx$'],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
