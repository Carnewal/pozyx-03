import { call, fork, put, take } from 'redux-saga/effects'
import request from 'superagent'
import { REQUEST_CREATE_TRIGGER, REQUEST_UPDATE_TRIGGER } from 'frontend/actions/TriggerActions'
import { ADD_ALERT } from 'frontend/actions/AppActions'
import { ERROR, SUCCESS } from 'frontend/constants/priorities'

// Create a new trigger
const postTrigger = (mapId) =>
  request
    .post(`/api/map/${mapId}/triggers`)
    .send()

// Update a trigger
const putTrigger = (mapId, id, name, active, json) =>
  request
    .post(`/api/map/${mapId}/triggers/${id}`)
    .send({ id,name,active,json })

export default function * tagEdit() {
  yield [
    fork(watchCreateTrigger),
    fork(watchUpdateTrigger),

  ]
}



function * watchCreateTrigger() {
  while (true) {
    const {mapId} = yield take(REQUEST_CREATE_TRIGGER)
    try {
      const response = yield call(postTrigger, mapId)
      
    } catch(ex) {
      yield put({type: ADD_ALERT, message: 'Could not create trigger', duration: 3000, priority: ERROR})
    }
  }
}

function * watchUpdateTrigger() {
  while (true) {
    const {mapId, id, name, active, json} = yield take(REQUEST_UPDATE_TRIGGER)
    const res = yield call(putTrigger, mapId, id, name, active, json)


  }
}
