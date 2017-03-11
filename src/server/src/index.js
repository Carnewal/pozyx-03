import express from 'express'
import path from 'path'
// Webpack
import webpack from 'webpack'
import webpackDevConfig from '../../webpack.config.frontend-dev'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
// Routes
import apiRoute from './route/api'
import model from './model'

const app = new express()

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackDevConfig)
  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackDevConfig.output.publicPath}))
  app.use(webpackHotMiddleware(compiler))
} else {
  app.use('/frontend-build', express.static(path.resolve(__dirname, '../../frontend/build')))
}

app.use('/public', express.static(path.resolve(__dirname, '../public')))

app.use('/api', apiRoute)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'))
})

model.sequelize.sync().then(function() {
  app.listen(3000, 'localhost', (err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Listening at http://localhost:3000')
  })
})

export default app
