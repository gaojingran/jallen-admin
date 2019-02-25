
const { override, fixBabelImports, addBabelPlugins, addLessLoader } = require('customize-cra');

module.exports = override(
  ...addBabelPlugins(
    ["@babel/plugin-proposal-decorators", { legacy: true }],
  ),
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