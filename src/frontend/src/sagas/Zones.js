import { call, fork, put, take } from 'redux-saga/effects'
import request from 'superagent'
import { REQUEST_ADD_ZONE } from 'frontend/actions/ZoneActions'
import { setAddingZone } from 'frontend/actions/AppActions'
import { addZone } from 'frontend/actions/ZoneActions'

const postZone = (mapId, name, color, points) =>
  request
    .post(`/api/map/${mapId}/zone`)
    .send({
      name: name,
      color: color,
      polygon: points
    })

function * watchAddZoneRequests() {
  while(true) {
    const {mapId, name, color, points} = yield take(REQUEST_ADD_ZONE)
    const response = yield call(postZone, mapId, name, color, points)
    yield put(setAddingZone(false))
    yield put(addZone(response.body.zone))
  }
}

export default function * tagEdit() {
  yield fork(watchAddZoneRequests)
}
