import request from 'superagent'
import { delay } from 'redux-saga'
import { call, select, put } from 'redux-saga/effects'
import {isInitialLoadComplete} from 'frontend/selectors/app'

const fetchMaps = () => request.get('/api/maps/')
const fetchTags = (mapId) => request.get(`/api/map/${mapId}/tags`)
const fetchAnchors = (mapId) => request.get(`/api/map/${mapId}/anchors`)


export default function *initialLoad() {
  // Put this in a loop so re-fetching the initial data is easy
  while (true) {
    const initialLoadComplete = yield select(isInitialLoadComplete)
    if(!initialLoadComplete) {
      const mapsRes = yield call(fetchMaps)
      const maps = mapsRes.body.maps
      const tagsRes = yield maps.map((map) => call(fetchTags, map.id))
      const anchorsRes = yield maps.map((map) => call(fetchAnchors, map.id))
      const tags = tagsRes.reduce(
        (prev, res) => prev.concat(res.body.tags),
        []
      )
      const anchors = anchorsRes.reduce(
        (prev, res) => prev.concat(res.body.anchors),
        []
      )

      //yield put(setInitialMaps(maps))
      //yield put(setInitialAnchors(anchors))
      //yield put(setInitialTags(tags))


    }
    yield delay(5000)
  }
}
