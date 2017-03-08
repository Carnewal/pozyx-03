import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import injectTapEventPlugin from 'react-tap-event-plugin'
import reducers from 'frontend/reducers'
import './styles.scss'
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

const logger = createLogger()
const finalCreateStore = compose(
  applyMiddleware(
    logger
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore)
const store = finalCreateStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  {} // Initial State
)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  document.getElementById('root')
)
