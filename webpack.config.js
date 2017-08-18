var webpack = require('webpack'); 
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

var isProduction = process.env.NODE_ENV === 'production';
var productionPluginDefine = isProduction ? [
  new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}})
] : [];

var clientPluginDefine = isProduction ? productionPluginDefine.concat([
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, sourceMap: false })
]) : [];

var commonLoaders = [
  {
    test: /\.json$/,
    loader: 'json-loader'
  }
];

module.exports = [
  {
    entry: './src/server.js',
    output: {
      path: `${__dirname}/dist`,
      filename: 'server.js',
      publicPath: '/'
    },
    target: 'node',
    node: {
      console: false,
      global: false,
      process: false,
      __filename: false,
      __dirname: false
    },
    externals: nodeExternals(),
    plugins: productionPluginDefine,
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-0'],
            compact: false
          }
        }
      ].concat(commonLoaders)
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        components: `${__dirname}/src/app/components`
      }
    }
  },
  {
    entry: './src/app/browser.jsx',
    output: {
      path: `${__dirname}/dist/assets`,
      publicPath: '/',
      filename: 'bundle.js',
    },
    plugins: clientPluginDefine.concat([
      new ExtractTextPlugin('index.css', {
        allChunks: true
      })
    ]),
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [{
              loader: 'babel-loader',
              query: {
                presets: ['react', 'es2015', 'stage-0'],
                compact: false
              }
            }]
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.js', 'jsx'],
      alias: {
        components: `${__dirname}/src/app/components`
      }
    }
  }
,];
