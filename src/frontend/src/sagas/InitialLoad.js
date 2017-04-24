import request from 'superagent'
import { delay } from 'redux-saga'
import { call, select, put } from 'redux-saga/effects'
import {isInitialLoadComplete} from 'frontend/selectors/app'

import {setCurrentmap, setInitialLoad} from 'frontend/actions/AppActions'
import {setMaps} from 'frontend/actions/MapActions'
import {setTags} from 'frontend/actions/TagActions'
import {setAnchors} from 'frontend/actions/AnchorActions'
import {setZones} from 'frontend/actions/ZoneActions'

const fetchMaps = () => request.get('/api/maps/')
const fetchTags = (mapId) => request.get(`/api/map/${mapId}/tags`)
const fetchAnchors = (mapId) => request.get(`/api/map/${mapId}/anchors`)
const fetchZones = (mapId) => request.get(`/api/map/${mapId}/zones`)


export default function *initialLoad() {
  // Put this in a loop so re-fetching the initial data is easy
  while (true) {
    const initialLoadComplete = yield select(isInitialLoadComplete)
    if(!initialLoadComplete) {
      const mapsRes = yield call(fetchMaps)
      const maps = mapsRes.body.maps
      const tagsRes = yield maps.map((map) => call(fetchTags, map.id))
      const anchorsRes = yield maps.map((map) => call(fetchAnchors, map.id))
      const zonesRes = yield maps.map((map) => call(fetchZones, map.id))
      const tags = tagsRes.reduce(
        (prev, res) => prev.concat(res.body.tags),
        []
      )
      const anchors = anchorsRes.reduce(
        (prev, res) => prev.concat(res.body.anchors),
        []
      )
      const zones = zonesRes.reduce(
        (prev, res) => prev.concat(res.body.zones),
        []
      )

      yield put(setMaps(maps))
      yield put(setAnchors(anchors))
      yield put(setTags(tags))
      yield put(setZones(zones))
      yield put(setCurrentmap(maps[0].id))
      yield put(setInitialLoad(true))
    }
    yield delay(5000)
  }
}
