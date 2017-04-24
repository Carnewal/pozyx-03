import * as types from '../src/frontend/src/actions/MapActions'
import reducer from '../src/frontend/src/reducers/app'

describe('app reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual([
      {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    ])
  })

  it('should handle SET_CURRENTMAP', () => {
    expect(
      reducer([], {
        type: types.SET_CURRENTMAP,
        text: 'Run the tests'
      })
    ).toEqual(
      [
        {
          text: 'Run the tests',
          completed: false,
          id: 0
        }
      ]
    )

    expect(
      reducer(
        [
          {
            text: 'Use Redux',
            completed: false,
            id: 0
          }
        ],
        {
          type: types.SET_CURRENTMAP,
          text: 'Run the tests'
        }
      )
    ).toEqual(
      [
        {
          text: 'Run the tests',
          completed: false,
          id: 1
        },
        {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ]
    )
  })
})
