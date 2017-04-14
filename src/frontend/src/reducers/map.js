import { SET_FLOORPLAN } from 'frontend/actions/MapActions'

const initialState = []

const map = (state = initialState, action) => {
  switch(action.type) {
    case SET_FLOORPLAN: {
      const newState = state.slice()
      newState.find((map) => map.mapId === action.currentMap).floorPlan = action.file
      return newState
    }
    default:
      return state
  }
}

export default map
