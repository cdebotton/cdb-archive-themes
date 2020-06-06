const path = require('path');

const withTM = require('next-transpile-modules')([
  'three/examples/jsm',
  'drei',
]);

module.exports = withTM({
  experimental: {
    reactMode: 'concurrent',
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      three$: path.resolve('./buildtools/three-exports.js'),
    };
    return config;
  },
});
