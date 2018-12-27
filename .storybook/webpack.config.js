const path = require('path');

const defaultConfig = require('@stoplight/storybook-config/webpack.config');

module.exports = (baseConfig, env, config) => {
  config = defaultConfig(baseConfig, env, config);

  // ... further customize if needed
  config.resolve.alias[`fs`] = path.resolve(__dirname, 'fs.js');
  config.resolve.alias[`util`] = path.resolve(__dirname, '../node_modules/util/util.js');

  return config;
};
