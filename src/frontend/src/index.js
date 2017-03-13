import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import injectTapEventPlugin from 'react-tap-event-plugin'
import store from 'frontend/store'

// import './styles.scss'
import 'font-awesome/css/font-awesome.css'
import 'flexboxgrid/css/flexboxgrid.css'

/**
 *  Copyright Notices:
 *
 *  © react-material-admin-template by rafaelhz (MIT)
 *  https://github.com/rafaelhz/react-material-admin-template
 *
 *
 */

injectTapEventPlugin()

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  document.getElementById('root')
)
