import test from 'ava';
import { SET_FLOORPLAN } from '../src/frontend/src/reducers/map';
import {SET_FLOORPLAN } from '../src/frontend/src/actions/MapActions';

test('map reducer', t => {
  t.deepEqual(map([
    { id: 0, completed: false, text: 'floorPlan1' },
    { id: 1, completed: false, text: 'floorPlan2' },
    { id: 2, completed: false, text: 'floorPlan3' }
  ], SET_FLOORPLAN(1)), [
    { id: 0, completed: false, text: 'floorPlan1' },
    { id: 1, completed: true, text: 'floorPlan2' },
    { id: 2, completed: false, text: 'floorPlan3' }
  ]);
});
