import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
//import createLogger from 'redux-logger'
import { routerReducer } from 'react-router-redux'
import reducers from 'frontend/reducers'
import createSagaMiddleware from 'redux-saga'
import websocketSaga from 'frontend/sagas/WebsocketSaga'
import uploadFloorplanSaga from 'frontend/sagas/UploadFloorplanSaga'

const sagaMiddleware = createSagaMiddleware()
//const logger = createLogger()
const finalCreateStore = compose(
    applyMiddleware(
      /*logger,*/
      sagaMiddleware
    )
  )(createStore)
const store = finalCreateStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  {}, // Initial State
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
sagaMiddleware.run(websocketSaga)
sagaMiddleware.run(uploadFloorplanSaga)

export default store
