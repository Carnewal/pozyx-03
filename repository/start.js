//https://github.com/Hashnode/mern-starter/blob/master/index.js
if (process.env.NODE_ENV === 'production') {
  require('./server/build/server.bundle.js');
} else {
  // Babel polyfill to convert ES6 code in runtime
  require('babel-register')();
  require('babel-polyfill');
  require('./server/src/index.js');
}
