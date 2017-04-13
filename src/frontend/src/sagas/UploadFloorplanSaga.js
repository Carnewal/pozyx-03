import { call, takeEvery, put } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import request from 'superagent'
import { UPLOAD_FLOORPLAN, SET_FLOORPLAN } from 'frontend/actions/MapActions'
import { ADD_ALERT } from 'frontend/actions/AppActions'
import { ERROR, SUCCESS } from 'frontend/constants/priorities'

function makeRequest(file, map) {
  const data = new FormData()
  data.append('file', file)

  return request.post('/api/map/'+map+'/image')
    .attach('mapimage', file)
}

function *uploadFloorplan(action) {
  try {
    const response = yield call(makeRequest, action.file, action.currentMap)
    const {body} = response
    yield put({type: SET_FLOORPLAN, file: body.mapURL, currentMap: action.currentMap})
  } catch (e) {
    yield put({type: ADD_ALERT, message: 'Unsupported filetype', duration: 3000, priority: ERROR})
  }
}

export default function *UploadFloorplanSaga() {
  yield takeEvery(UPLOAD_FLOORPLAN, uploadFloorplan)
}
