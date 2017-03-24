import Primus from '../primus.js'
import { call, take, put } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { showPositions, SHOW_POSITIONS } from 'frontend/actions/TagActions'

function initWebsocket() {
  return eventChannel(emitter => {
    const primus = new Primus('http://'+window.location.hostname + window.location.port?":"+window.location.port:"", {})

    primus.on('data', (data) => {
      switch (data.action) {
        //case SHOW_POSITIONS:
          //return emitter(showPositions(data.positions))
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
