/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //   mode: 'development', // mode  if mode == production webpack will optimize code
  entry: {
    main:'./src/main.ts',
    question:{
      import :'./src/components/question/preload.ts',
      filename: 'question/preload.js',
    },
    answer:{
      import :'./src/components/answer/preload.ts',
      filename: 'answer/preload.js',
    }
  },
  // Enable sourcemaps for debugging webpack's output.
  //   devtool: "source-map",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },

  resolve: {
    extensions: ['.ts'], // add external extion for example import 'index' it will lookup 'index.ts'
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.ts?$/, loader: 'ts-loader', exclude: /node_modules/ }
    ],
  },
  optimization: {
    minimize: false, // by default is set to true, set to false for readable code
  },
  target:'electron-main'
};
