
const path = require('path');
const { override, fixBabelImports, addBabelPlugins, addLessLoader, addWebpackAlias } = require('customize-cra');

const resolve = (p) => {
  return path.resolve(__dirname, p);
};

module.exports = override(
  ...addBabelPlugins(
    ["@babel/plugin-proposal-decorators", { legacy: true }],
  ),
  addWebpackAlias({
    "$S": resolve('src'),
    "$C": resolve('src/components'),
    "$A": resolve('src/assets'),
    "$M": resolve('src/models'),
    "$P": resolve('src/pages'),
    "$U": resolve('src/utils'),
  }),
  addLessLoader({
    strictMath: true,
    noIeCompat: true,
    javascriptEnabled: true,
    localIdentName: '[local]--[hash:base64:5]',
  }),
  fixBabelImports('import', {
    libraryName: '@alifd/next',
    libraryDirectory: 'es'
  })
);
