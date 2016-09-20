
/* eslint-env node */
/* eslint no-console: 0, no-var: 0 */

const webpack = require('webpack');
const rucksack = require('rucksack-css');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const envalid = require('envalid');
const path = require('path');

const config = require('./config/config');

// Validate environment variables
validateEnvironmentVariables();

const isProduction = process.env.NODE_ENV === 'production';

const outputPublicPaths = {
  production: '/',
  development: 'http://localhost:3000/',
  devserver: 'http://localhost:8080/',
};

console.log(`----- ${process.env.NODE_ENV.toUpperCase()} build.`); // eslint-disable-line no-console

// Base Webpack configuration
const webpackConfig = {
  context: path.join(__dirname, 'client'),
  devtool: 'eval', // isProduction ? 'cheap-module-source-map' : 'eval',
  entry: {
    main: ['./index.js'],
    // Webpack cannot produce chunks with a stable chunk hash as of June 2016,
    // stable meaning the hash value changes only when the the code itself changes.
    // See doc/FAQ.md#webpackChunks.
    // This vendor chunk will not reduce network requests, it will likely force a second request
    // each time the main chunk changes. So why separate them?
    /*
    vendor: [
      'feathers-client',
      'feathers-hooks-common',
      'feathers-reduxify-authentication',
      'feathers-reduxify-services',
      'feathers-service-verify-reset',
      'material-ui',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'react-tap-event-plugin',
      'redux',
      'redux-actions',
      'redux-auth-wrapper',
      'redux-form',
      'redux-form-material-ui',
      'redux-multi',
    ],
    */
    // Chunks for code which is dynamically optionally loaded makes sense.
    // The first page will render faster as the parsing of such chunks can be delayed
    // till they are needed.
    // Of course the React routing must be changed to load such chunks as needed.
    // Maybe we'll make the routing do that at some time.
    /*
    user: [
      // './screens/Users/UserSignIn', // sign in occurs often enough to retain in main chunk
      './screens/Users/UserEmailChange',
      './screens/Users/UserForgotPwdReset',
      './screens/Users/UserForgotPwdSendEmail',
      './screens/Users/UserPasswordChange',
      './screens/Users/UserProfile',
      './screens/Users/UserProfileChange',
      './screens/Users/UserRolesChange',
      './screens/Users/UserSignIn',
      './screens/Users/UserSignInPending',
      './screens/Users/UserSignUp',
      './screens/Users/UserSignUpSendEmail',
      './screens/Users/UserSignUpValidateEmail',
    ],
    */
  },
  output: {
    path: path.join(__dirname, 'public', 'dist'),
    filename: '[name].bundle.[chunkhash].js',
    /* We'd need this if we had chunks
    chunkFilename: '[name].bundle.[chunkhash].js',
    */
    // production could be "http://someCDN.com/"
    // localhost:8080 allows index.html to be used while webpack-dev-server is running.
    // publicPath: isProduction ? '/' : `http://localhost:${isWebpackDevServer ? 8080 : 3000}/`,
    //publicPath: outputPublicPaths[process.env.NODE_ENV],
  },
  /* This is needed for joi to work on the browser, if the client has that dependency
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
  },
  */
  module: {
    loaders: [
      {
        // File index.html is created by html-webpack-plugin. It should be a file webpack processes.
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
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
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          /*
          'react-hot',
          */
          'babel-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    // Reroute import/require to specific files. 'react$' reroutes 'react' but not 'react/foo'.
    alias: {
      // These packages have prebuilt dist versions. They also warn if you minimize their source or
      // dev-distr versions.
      // We route our import/require to the proper dist version.
      // 'react$': path.join(__dirname, 'node_modules', 'react','dist',
      //  (isProduction ? 'react.min.js' : 'react.js')),
      react: path.join(__dirname, 'node_modules', 'react'), // !!! IMPORTANT
      // 'react-dom$': path.join(__dirname, 'node_modules', 'react-dom','dist',
      //  (isProduction ? 'react-dom.min.js' : 'react-dom.js')),
      redux$: path.join(__dirname, 'node_modules', 'redux', 'dist',
        (isProduction ? 'redux.min.js' : 'redux.js')),
      'react-redux$': path.join(__dirname, 'node_modules', 'react-redux', 'dist',
        (isProduction ? 'react-redux.min.js' : 'react-redux.js')),

    },
  },
  postcss: [
    rucksack({
      autoprefixer: true,
    }),
  ],
  plugins: [
    // Webpack's default file watcher does not work in Virtual Machines with NFS file systems.
    new webpack.OldWatchingPlugin(), // can use "webpack-dev-server --watch-poll" instead
    // repeat new HtmlWebpackPlugin() for additional HTML files
    new HtmlWebpackPlugin({
      // Template based on https://github.com/jaketrent/html-webpack-template/blob/master/index.ejs
      template: path.join(process.cwd(), 'server', 'utils', 'index.ejs'),
      filename: 'index.html',
      inject: false, // important
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyCSS: true,
        minifyJS: true,
        preserveLineBreaks: true, // leave HTML readable
      },
      cache: false,
      /* We'd need this if we had a dynamically loaded user chunk
      excludeChunks: ['user'],
       */

      // Substitution values
      supportOldIE: false,
      meta: { description: config.client.appName },
      title: config.client.appName,
      faviconFile: '/favicon.ico',
      mobile: false,
      links: [],
      baseHref: null,
      unsupportedBrowserSupport: false,
      appMountId: 'root',
      appMountIds: {},
      addRobotoFont: true, // See //www.google.com/fonts#UsePlace:use/Collection:Roboto:400,300,500
      copyWindowVars: {},
      scripts: [ '/socket.io/socket.io.js' ],
      devServer: false,
      googleAnalytics: false,
    }),
    // Define replacements for global constants in the client code.
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }, // used by React, etc?
      '__processEnvNODE_ENV__': JSON.stringify(process.env.NODE_ENV), // used by us
    }),
    /* We'd need this if we had a vendor chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // filename: 'vendor.bundle.[chunkhash].js',
      minChunks: Infinity,
    }),
    */
    /* Trying to get a stable chunk hash. Sometimes works in particular circumstances.
    new webpack.optimize.OccurrenceOrderPlugin(true),
     */
  ],
  /* Trying to get a stable chunk hash
   recordsPath: path.join(__dirname, 'webpack.records.json'),
   */
  devServer: {
    contentBase: './client',
    // Sometimes placing the inline & hot options here does not work. Best to include them in CLI.
    /*
    hot: true
    */
  },
};

// Production customization
if (isProduction) {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
      sourceMap: false,
      mangle: true,
      minimize: true,
      verbose: false,
    })
  );
}

module.exports = webpackConfig;

// Validate environment variables
function validateEnvironmentVariables() {
  const strPropType = envalid.str;

  // valid NODE_ENV values.
  const nodeEnv = {
    production: 'production',
    prod: 'production',
    development: 'development',
    dev: 'development',
    devserver: 'devserver',
    testing: 'devserver',
    test: 'devserver',
  };

  const cleanEnv = envalid.cleanEnv(process.env,
    {
      NODE_ENV: strPropType({
        choices: Object.keys(nodeEnv),
        default: config.env.NODE_ENV,
        desc: 'processing environment',
      }),
    }
  );

  process.env.NODE_ENV = nodeEnv[cleanEnv.NODE_ENV];
}

/* Info gathered while trying to optimize webpack build times
See https://robertknight.github.io/posts/webpack-dll-plugins/ and others
without Dll
 73747ms build modules
 249ms seal
 566ms optimize
 167ms hashing
 280ms create chunk assets
 14ms additional chunk assets
 9453ms optimize chunk assets
 347ms optimize assets
 928ms emit
 Hash: 2dfc2b299050a96627b4
 Version: webpack 1.13.1
 Time: 85894ms

 Asset                                   Size          Chunks        Chunk Names
 user.bundle.a8a96d270291ce167d6c.js      639 kB       0  [emitted]  user
 vendor.bundle.95e8a535b85b002ff2eb.js   9.89 MB       1  [emitted]  vendor
 main.bundle.27c3a93a890af488d77e.js     1.12 MB       2  [emitted]  main
 index.html                              1.13 kB          [emitted]


 dll
 [ 'fixed-data-table',
 'isomorphic-fetch',
 'joi',
 'material-ui',
 'react',
 'react-dom',
 'react-redux',
 'react-router',
 'react-router-proxy-loader',
 'react-router-redux',
 'react-tap-event-plugin',
 'redux',
 'redux-actions',
 'redux-auth-wrapper',
 'redux-form',
 'redux-logger',
 'redux-multi',
 'redux-promise-middleware',
 'redux-thunk' ]
 Hash: 6362e9e1a2e83a53043b
 Version: webpack 1.13.1
 Time: 23239ms

 Asset                                  Size          Chunks        Chunk Names
 vendor.bundle.15ebd92af32b28ad8e50.js  8.65 MB       0  [emitted]  vendor
 + 727 hidden modules

with Dll
 38933ms build modules
 144ms seal
 123ms optimize
 186ms hashing
 472ms create chunk assets
 25ms additional chunk assets
 8762ms optimize chunk assets
 777ms optimize assets
 367ms emit
 Hash: e577b3f7fb9ce7b7d8ca
 Version: webpack 1.13.1
 Time: 49977ms

 Asset                                   Size       Chunks        Chunk Names
 main.bundle.407930e583af7eea79c4.js  5.69 MB       0  [emitted]  main
 user.bundle.0f13a46c5f30ec4a2ea2.js   4.6 MB       1  [emitted]  user
 index.html  1.02 kB          [emitted]


-- stats while running 2nd time, so cache is primed

build regular without a dll
 50818ms build modules
 219ms seal
 304ms optimize
 121ms hashing
 640ms create chunk assets
 41ms additional chunk assets
 12313ms optimize chunk assets
 1394ms optimize assets
 891ms emit
 Hash: 2dfc2b299050a96627b4
 Version: webpack 1.13.1
 Time: 67101ms

 Asset     Size  Chunks             Chunk Names
 user.bundle.a8a96d270291ce167d6c.js   639 kB       0  [emitted]  user
 vendor.bundle.95e8a535b85b002ff2eb.js  9.89 MB       1  [emitted]  vendor
 main.bundle.27c3a93a890af488d77e.js  1.12 MB       2  [emitted]  main
 index.html  1.13 kB          [emitted]

build the dll
 [ 'fixed-data-table',
 'isomorphic-fetch',
 'joi',
 'material-ui',
 'react',
 'react-dom',
 'react-redux',
 'react-router',
 'react-router-proxy-loader',
 'react-router-redux',
 'react-tap-event-plugin',
 'redux',
 'redux-actions',
 'redux-auth-wrapper',
 'redux-form',
 'redux-logger',
 'redux-multi',
 'redux-promise-middleware',
 'redux-thunk' ]
 Hash: 6362e9e1a2e83a53043b
 Version: webpack 1.13.1
 Time: 34815ms

 Asset     Size  Chunks             Chunk Names
 vendor.bundle.15ebd92af32b28ad8e50.js  8.65 MB       0  [emitted]  vendor
 + 727 hidden modules

build with dll
 28726ms build modules
 71ms seal
 31ms optimize
 72ms hashing
 142ms create chunk assets
 4ms additional chunk assets
 5790ms optimize chunk assets
 582ms optimize assets
 396ms emit
 Hash: e577b3f7fb9ce7b7d8ca
 Version: webpack 1.13.1
 Time: 35950ms

 Asset     Size  Chunks             Chunk Names
 main.bundle.407930e583af7eea79c4.js  5.69 MB       0  [emitted]  main
 user.bundle.0f13a46c5f30ec4a2ea2.js   4.6 MB       1  [emitted]  user
 index.html  1.02 kB          [emitted]
 */
