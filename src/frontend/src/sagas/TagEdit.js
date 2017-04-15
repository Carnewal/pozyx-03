import { call, fork, put, take } from 'redux-saga/effects'
import request from 'superagent'
import { REQUEST_ADD_LABEL, REQUEST_REMOVE_LABEL, addLabel, removeLabel } from 'frontend/actions/TagActions'



const deleteLabel = (mapId, tagId, labelId) =>
  request.delete(`/api/map/${mapId}/tag/${tagId}/label/${labelId}`)

const postLabel = (mapId, tagId, label) =>
  request
    .post(`/api/map/${mapId}/tag/${tagId}/label`)
    .send({label: label})


function * watchDeleteLabelRequests() {
    while(true) {
      const {mapId, tagId, labelId} = yield take(REQUEST_REMOVE_LABEL)
      const response = yield call(deleteLabel, mapId, tagId, labelId)
      yield put(removeLabel(tagId, labelId))
    }
}

function * watchAddLabelRequests() {
  while(true) {

    const {mapId, tagId, labelName} = yield take(REQUEST_ADD_LABEL)
    const response = yield call(postLabel, mapId, tagId, labelName)
    yield put(addLabel(tagId, response.body.label))
  }
}

export default function * tagEdit() {
  yield [fork(watchAddLabelRequests), fork(watchDeleteLabelRequests)]
}
