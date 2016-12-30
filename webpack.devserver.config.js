
const webpack = require('webpack'); // eslint-disable-line import/no-unresolved
const rucksack = require('rucksack-css');
const path = require('path');



// ********** Note require('config') is not used here. Any params must be set in process.env *******
var reactDomLibPath = path.join(__dirname, "./node_modules/react-dom/lib");
var alias = {};
["EventPluginHub", "EventConstants", "EventPluginUtils", "EventPropagators",
 "SyntheticUIEvent", "CSSPropertyOperations", "ViewportMetrics"].forEach(function(filename){
    alias["react/lib/"+filename] = path.join(__dirname, "./node_modules/react-dom/lib", filename);
});

module.exports = {


  context: path.join(__dirname, './client'),
  devtool: 'inline-source-map',
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
    alias: alias
  },
  postcss: [
    rucksack({
      autoprefixer: true,
    }),
  ],
  plugins: [
    // Webpack's default file watcher does not work in Virtual Machines with NFS file systems.
    new webpack.OldWatchingPlugin(), // can use "webpack-dev-server --watch-poll" instead
    // Define replacements for global constants in the client code.
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }, // used by React, etc?
      __processEnvNODE_ENV__: JSON.stringify(process.env.NODE_ENV), // used by us
    }),
  ],
  devServer: {
    contentBase: './client',
  },
};
