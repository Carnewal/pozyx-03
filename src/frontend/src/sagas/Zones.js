import { call, fork, put, take } from 'redux-saga/effects'
import request from 'superagent'
import { REQUEST_ADD_ZONE, REQUEST_REMOVE_ZONE } from 'frontend/actions/ZoneActions'
import { setAddingZone, setShowSaveDialog } from 'frontend/actions/AppActions'
import { addZone, removeZone } from 'frontend/actions/ZoneActions'

const postZone = (mapId, name, color, points) =>
  request
    .post(`/api/map/${mapId}/zone`)
    .send({
      name: name,
      color: color,
      polygon: points
    })

const deleteZone = (zoneId) =>
  request
    .delete(`/api/zones/${zoneId}`)

function * watchAddZoneRequests() {
  while(true) {
    const {mapId, name, color, points} = yield take(REQUEST_ADD_ZONE)
    const response = yield call(postZone, mapId, name, color, points)
    yield put(setAddingZone(false))
    yield put(setShowSaveDialog(false))
    yield put(addZone(response.body.zone))
  }
}

function * watchRemoveZoneRequests() {
  while (true) {
    const { zoneId } = yield take(REQUEST_REMOVE_ZONE)
    const response = yield call(deleteZone, zoneId)
    yield put(removeZone(zoneId))
  }
}

export default function * tagEdit() {
  yield [fork(watchAddZoneRequests), fork(watchRemoveZoneRequests)]
}
