const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    jsx: './frontend/src/index',
    vendor: [
      'konva',
      'react',
      'react-dom',
      'react-dropzone',
      'react-konva',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-saga',
      'material-ui'
    ]
  },
  output: {
    path: path.join(__dirname, 'frontend/build'),
    filename: 'bundle.js',
    publicPath: '/frontend-build/'
  },
  resolve: {
    alias: {
      server: path.resolve(__dirname, 'server/src/'),
      frontend: path.resolve(__dirname, 'frontend/src/'),
      datamocking: path.resolve(__dirname, 'datamocking/')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),

  ],
  module: {
    loaders: [
      {
        test: /\.js?/,
        exclude: [/node_modules/, /styles/],
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'frontend/src')
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      }
    ]
  }
}
