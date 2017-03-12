import Primus from '../primus.js'
import { call, take, put } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { showPositions, SHOW_POSITIONS } from '../actions/TagActions'

function initWebsocket() {
  return eventChannel(emitter => {
    const primus = new Primus('http://localhost:3000', {})

    primus.on('data', (data) => {
      switch (data.action) {
        case SHOW_POSITIONS:
          return emitter(showPositions(data.positions))
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
