/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //   mode: 'development', // mode  if mode == production webpack will optimize code
  entry: {
    shared: './src/services/question-and-answer.service.ts',
    answer: {
      import: ['./src/components/answer/answer.html'],
      filename: 'components/answer/renderer.js',
    //   dependOn: 'shared',
    },
    question: {
      import: ['./src/components/question/renderer.ts','./src/components/question/question.html'],
      filename: 'components/question/renderer.js',
      dependOn: 'shared',
    },
    main: {
      import: './src/main.ts',
    //   dependOn: 'shared',
    },
  },
  // Enable sourcemaps for debugging webpack's output.
  //   devtool: "source-map",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  resolve: {
    extensions: ['.ts', '.html'], // add external extion for example import 'index' it will lookup 'index.ts'
    fallback: {
    //   path: false,
     path:require.resolve("path-browserify"),
      fs: false,
    },
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.ts?$/, loader: 'ts-loader', exclude: /node_modules/ },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      //   { test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.html/,
        type: 'asset/resource',
        generator: {
          filename: 'components/[name]/[name][ext]',
        },
      },
    ],
  },
  optimization: {
    // runtimeChunk: 'single', // check duplicate,
    // splitChunks: {
    //   chunks: 'all',
    // },
    minimize: false, // by default is set to true, set to false for readable code
  },
};
