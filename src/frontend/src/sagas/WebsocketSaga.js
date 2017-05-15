import Primus from '../primus.js'
import { call, take, put } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { showPositions, SHOW_POSITIONS } from 'frontend/actions/TagActions'
import { addNotification, ADD_NOTIFICATION } from 'frontend/actions/AppActions'

function initWebsocket() {
  return eventChannel(emitter => {
    const primus = new Primus('http://'+window.location.hostname + window.location.port?":"+window.location.port:"", {})

    primus.on('data', (data) => {
      switch (data.action) {
        case SHOW_POSITIONS:
          return emitter(showPositions(data.positions))
        case ADD_NOTIFICATION:
          return emitter(addNotification(data.notification))
      }
    })

    return () => {
      primus.end()
      primus.destroy()
    }
  })
}

export default function *wsSagas() {
  const channel = yield call(initWebsocket)

  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}
