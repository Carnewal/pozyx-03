import { SET_FLOORPLAN, SET_MAPS } from 'frontend/actions/MapActions'

const initialState = []

const map = (state = initialState, action) => {
  switch(action.type) {
    case SET_MAPS: {
      return [...action.maps]
    }
    case SET_FLOORPLAN: {
      const newState = state.slice()
      newState.find((map) => map.id === action.currentMap).floorPlan = action.file
      return newState
    }
    default:
      return state
  }
}

export default map
