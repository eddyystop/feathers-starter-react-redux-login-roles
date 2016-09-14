
const webpack = require('webpack'); // eslint-disable-line import/no-unresolved
const path = require('path');

module.exports = {
  context: path.join(__dirname, './client'),
  devtool: 'eval', // isProduction ? 'cheap-module-source-map' : 'eval',
  entry: './index.js',
  output: {
    path: path.join(__dirname, './public/dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.OldWatchingPlugin(), // using "webpack-dev-server --watch-poll" instead
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') },
    }),
  ],
  devServer: {
    contentBase: './client',
  },
};

/*
 - [x] [Autoprefixer](https://github.com/postcss/autoprefixer)
 - [x] [PostCSS](https://github.com/postcss/postcss)
 - [x] [CSS modules](https://github.com/outpunk/postcss-modules)
 - [x] [Rucksack](http://simplaio.github.io/rucksack/docs)
 */
