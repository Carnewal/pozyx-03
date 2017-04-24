import websocketSaga from 'frontend/sagas/WebsocketSaga'
import uploadFloorplanSaga from 'frontend/sagas/UploadFloorplanSaga'
import initialLoad from 'frontend/sagas/InitialLoad'
import tagEdit from 'frontend/sagas/TagEdit'
import zones from 'frontend/sagas/Zones'

import { fork } from 'redux-saga/effects'


export default function * root () {
  yield [
    fork(websocketSaga),
    fork(uploadFloorplanSaga),
    fork(initialLoad),
    fork(tagEdit),
    fork(zones)
  ]
}
