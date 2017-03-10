import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createLogger from 'redux-logger'
import { routerReducer } from 'react-router-redux'
import reducers from 'frontend/reducers'

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

export default store
