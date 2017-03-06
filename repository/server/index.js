const path = require('path');
const express = require('express');

const app = express();

app.use('/public', express.static(__dirname + '/public'));

if (process.env.NODE_ENV === 'production') {
  app.use('/frontend-build', express.static(__dirname + '/frontend-build'));
} else {
  const webpack = require('webpack');
  const config = require('../webpack.config.dev');
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:3000');
});
