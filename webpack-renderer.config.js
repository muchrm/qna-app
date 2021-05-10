/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //   mode: 'development', // mode  if mode == production webpack will optimize code
  entry: {
    shared: './src/services/question-and-answer.service.ts',
    answer: {
      import: ['./src/components/answer/renderer.ts'],
      filename: 'answer/renderer.js',
      dependOn: 'shared',
    },
    question: {
      import: ['./src/components/question/renderer.ts'],
      filename: 'question/renderer.js',
      dependOn: 'shared',
    },
  },
  // Enable sourcemaps for debugging webpack's output.
  // devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.ts'], // add external extion for example import 'index' it will lookup 'index.ts'
    fallback: {},
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.ts?$/, loader: 'ts-loader', exclude: /node_modules/ },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      // { test: /\.js$/, loader: 'source-map-loader' },
      // {
      //   test: /\.html/,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: '[name][ext]',
      //   },
      // },
    ],
  },
  optimization: {
    runtimeChunk: 'single', // check duplicate,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        vendor: {
          test: /[\\/]shared[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimize: false, // by default is set to true, set to false for readable code
  },
  // target:'electron-renderer',
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/**/*.html',
          to({ context, absoluteFilename }) {
            return `${path.relative(`${context}/src/components`, absoluteFilename)}`;
          },
        },
      ],
    }),
  ],
};
