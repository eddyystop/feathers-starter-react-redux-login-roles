
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
      {
        // When require'd, these /client/../*.inject.css files are injected into the DOM as is.
        test: /\.inject\.css$/,
        include: /client/,
        loader: 'style!css',
      },
      {
        // When required, the class names in these /client/../*.css are returned as an object.
        // after being made unique. The css with the modified class names is injected into the DOM.
        test: /^(?!.*\.inject\.css).*\.css$/,
        include: /client/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=' +
          '[name]__[local]___[hash:base64:5]',
          'postcss-loader',
        ],
      },
      {
        // Standard processing for .css outside /client
        test: /\.css$/,
        exclude: /client/,
        loader: 'style!css',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    // Webpack's default file watcher does not work in Virtual Machines with NFS file systems.
    new webpack.OldWatchingPlugin(), // Using "webpack-dev-server --watch-poll" instead
    new webpack.DefinePlugin({ // Define replacements for global constants in the client code.
      '__processEnvNODE_ENV__': JSON.stringify(process.env.NODE_ENV || 'devserver'),
    }),
  ],
  devServer: {
    contentBase: './client',
  },
};

/* add
 - [x] [Autoprefixer](https://github.com/postcss/autoprefixer)
 - [x] [Rucksack](http://simplaio.github.io/rucksack/docs)
 */
