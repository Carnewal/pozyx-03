var fs = require('fs');
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'server/src/index.js'),
  output: {
    path: __dirname + '/server/build/',
    filename: 'server.bundle.js',
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'server',
      'node_modules',
    ],
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react','latest', 'stage-0']
        },
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  }/*,
  plugins: [
    new ExternalsPlugin({
      type: 'commonjs',
      include: path.join(__dirname, './node_modules/'),
    }),
  ],*/
};
