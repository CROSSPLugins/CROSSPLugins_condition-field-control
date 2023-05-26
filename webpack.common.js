const path = require('path');
const KintonePlugin = require('@kintone/webpack-plugin-kintone-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: {
    settingScreen: './src/settingScreen/index.tsx',
    userScreen: './src/userScreen/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'plugin', 'js'),
    filename: '[name].js'
  },
  plugins: [
    new KintonePlugin({
      manifestJSONPath: './plugin/manifest.json',
      privateKeyPath: './plugin/.ppk/.private.ppk',
      pluginZipPath: `dist/${process.env.npm_package_config_plugin_name}.${process.env.npm_package_version}.zip`
    }),
    new NodePolyfillPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader'
      },
      {
        test: /\.css/,
        use: [
          'style-loader', 'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  }
};
