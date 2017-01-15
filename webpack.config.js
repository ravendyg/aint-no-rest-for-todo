/* global process, __dirname, require, module */
'use strict';

const webpack = require('webpack');
const path = require('path');

const dev = !(process.argv.indexOf('--env=prod') !== -1);
console.log(dev ? 'development' : 'production');

module.exports =
{
  entry:
  {
    app: './client-src/app'
  },
  output:
  {
    path: path.join(__dirname, 'public', 'build'),
    filename: '[name].min.js',
    library: '[name]'
  },
  resolve:
  {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.html'],
    alias:
    {
      'vue$': 'vue/dist/vue.js'
    }
  },
  watch: dev,
  devtool: dev ? 'source-map' : null,
  module:
  {
    loaders:
    [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query:
        {
          presets: ['es2015'],
          plugins: ['transform-vue-jsx']
        }
      },
      {
        test: /\.html$/,
        name: 'mandrillTemplates',
        loader: 'raw!html-minify'
      },
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-inline'
      // },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },
  'html-minify-loader':
  {
    empty: false,        // KEEP empty attributes
    cdata: true,        // KEEP CDATA from scripts
    comments: false,     // KEEP comments
    dom:
    {                            // options of !(htmlparser2)[https://github.com/fb55/htmlparser2]
      lowerCaseAttributeNames: false      // do not call .toLowerCase for each attribute name (Angular2 use camelCase attributes)
    }
  },
  plugins: dev
      ? []
      : [
        new webpack.DefinePlugin({
          'process.env':
          {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          mangle: true,
          sourcemap: false,
          compress:
          {
            warnings: false,
            'dead_code': true,
            'drop_debugger': true,
            conditionals: true,
            unused: true,
            'drop_console': true
          }
        })
      ]
};
