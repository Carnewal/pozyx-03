import test from 'ava'
import initialLoad, {fetchMaps, fetchTags, fetchAnchors, fetchZones} from '../../src/sagas/initialLoad'
import { delay } from 'redux-saga'
import { put, call, select } from 'redux-saga/effects'
import {isInitialLoadComplete} from 'frontend/selectors/app'

import {setCurrentmap, setInitialLoad} from '../../src/actions/AppActions'
import {setMaps} from '../../src/actions/MapActions'
import {setTags} from '../../src/actions/TagActions'
import {setAnchors} from '../../src/actions/AnchorActions'
import {setZones} from '../../src/actions/ZoneActions'

test('does nothing if initialLoadComplete is TRUE', t => {
  const gen = initialLoad()
  const step = (mockLastYield) => gen.next(mockLastYield).value
  t.deepEqual(step(), select(isInitialLoadComplete))
  t.deepEqual(step(), delay(5000))
})

test('fetches the initial data if initialLoadComplete is FALSE', t => {
  const gen = initialLoad()
  const mapsRes = {body: {maps: [ {id:1} ]}}
  const tagsRes = {body: {tags: [ {id:1} ]}}
  const anchorsRes = {body: {anchors: [ {id:1} ]}}
  const zonesRes = {body: {zones: [ {id:1} ]}}


  const step = (mockLastYield) => gen.next(mockLastYield).value
  t.deepEqual(step(), select(isInitialLoadComplete))
  t.deepEqual(step(), call(fetchMaps))
  t.deepEqual(step(mapsRes), call(fetchTags))
  t.deepEqual(step(tagsRes), call(fetchAnchors))
  t.deepEqual(step(anchorsRes), call(fetchZones))
  t.deepEqual(step(zonesRes), put(setMaps(mapsRes.body.maps)))
  t.deepEqual(step(), put(setAnchors(anchorsRes.body.anchors)))
  t.deepEqual(step(), put(setTags(tagsRes.body.tags)))
  t.deepEqual(step(), put(setZones(zonesRes.body.zones)))
  t.deepEqual(step(), put(setCurrentmap(mapsRes.body.maps[0].id)))
  t.deepEqual(step(), put(setInitialLoad(true)))

})
