import path from 'path'
import express from 'express'
import os from 'os'

// Webpack
import webpack from 'webpack'
import webpackDevConfig from '../../webpack.config.frontend-dev'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
// Routes
import apiRoute from './route/api'

import realtime from './realtime'
import model from './model'

const app = new express()

let ipaddress = 'localhost'

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackDevConfig)
  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackDevConfig.output.publicPath}))
  app.use(webpackHotMiddleware(compiler))
} else {
  app.use('/frontend-build', express.static(path.resolve(__dirname, '../../frontend/build')))

  //gebaseerd op: http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
  const ifaces = os.networkInterfaces()
  Object.keys(ifaces).forEach(function(ifname) {
    let alias = 0

    ifaces[ifname].forEach(function(iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return
      }

      if (alias == 0) {
        ipaddress = iface.address
      }
      ++alias
    })
  })
}

app.use('/public', express.static(path.resolve(__dirname, '../public')))

app.use('/api', apiRoute)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'))
})

model.sequelize.sync().then(function() {
  const server = app.listen(3000, ipaddress, (err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(`Listening at http://${ipaddress}`)
  })
  realtime(server)
})

export default app
