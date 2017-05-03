// src/reducers.test.js
import test from 'ava';
import { SET_CURRENTMAP } from '../src/frontend/src/reducers/app';
import {SET_CURRENTMAP } from '../src/frontend/src/actions/MapActions';

test('app reducer', t => {
  t.deepEqual(app([
    { id: 0, completed: false, text: 'map1' },
    { id: 1, completed: false, text: 'map2' },
    { id: 2, completed: false, text: 'map3' }
  ], SET_CURRENTMAP(1)), [
    { id: 0, completed: false, text: 'map1' },
    { id: 1, completed: true, text: 'map2' },
    { id: 2, completed: false, text: 'map3' }
  ]);
});
