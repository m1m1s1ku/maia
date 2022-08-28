/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { resolve, join } = require('path');
const {merge} = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const ENV = process.argv.find(arg => arg.includes('production'))
  ? 'production'
  : 'development';
const OUTPUT_PATH = ENV === 'production' ? resolve('dist') : resolve('src');
const INDEX_TEMPLATE = resolve('./src/index.html');

const webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs';
const webanimationsjs = './node_modules/web-animations-js';

const assets = [];

const polyfills = [
  {
    from: resolve(`${webcomponentsjs}/webcomponents-*.js`),
    to: join(OUTPUT_PATH, 'vendor', '[name][ext]')
  },
  {
    from: resolve(`${webcomponentsjs}/bundles/*.js`),
    to: join(OUTPUT_PATH, 'vendor', 'bundles', '[name][ext]')
  },
  {
    from: resolve(`${webanimationsjs}/web-animations-next-lite.min.js`),
    to: join(OUTPUT_PATH, 'vendor', '[name][ext]')
  },
  {
    from: resolve('./src/robots.txt'),
    to: OUTPUT_PATH
  },
  {
    from: resolve('./src/boot.js'),
    to: OUTPUT_PATH
  }
];

const commonConfig = merge([
  {
    entry: './src/elara-app.ts',
    output: {
      path: OUTPUT_PATH,
      filename: '[name].[chunkhash:8].js'
    },
    resolve: {
      extensions: [ '.ts', '.js', '.css' ]
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['css-loader'],
        },
        {
            test: /\.tsx?$/,
            loader: 'esbuild-loader',
            options: {
              loader: 'ts',
              target: 'chrome80'
            }
          },
      ]
    }
  }
]);

const developmentConfig = merge([
  {
    plugins: [
      new CopyWebpackPlugin({patterns:polyfills}),
      new HtmlWebpackPlugin({
        template: INDEX_TEMPLATE
      }),
      new ESLintPlugin()
    ],

    devServer: {
      compress: true,
      port: 3006,
      historyApiFallback: true,
      host: 'localhost'
    }
  }
]);

const productionConfig = merge([
  {
    devtool: 'nosources-source-map',
    plugins: [
      new CleanWebpackPlugin({ verbose: true }),
      new CopyWebpackPlugin({patterns: [...polyfills, ...assets]}),
      new HtmlWebpackPlugin({
        template: INDEX_TEMPLATE,
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
          minifyJS: true
        }
      })
    ]
  }
]);

module.exports = mode => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};


