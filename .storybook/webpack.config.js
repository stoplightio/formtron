const defaultConfig = require('@stoplight/scripts/.storybook/webpack.config');

module.exports = (baseConfig, env, config) => {
  config = defaultConfig(baseConfig, env, config);

  // ... further customize if needed

  return config;
};
