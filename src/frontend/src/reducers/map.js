import { SET_FLOORPLAN } from 'frontend/actions/MapActions'

const initialState = [
  {
    "mapId": 4,
    "mapName": "Demo Map",
    "mapURL": "http://localhost:3000/public/maps/4.png",
    "floorPlan": "http://localhost:3000/public/maps/4.png",
    "x": 200,
    "y": 100,
    "z": 2
  },
  {
    "mapId": 5,
    "mapName": "Warehouse",
    "mapURL": "http://localhost:3000/public/maps/5.png",
    "x": 140,
    "y": 100,
    "z": 2,
    "floorPlan": ''
  }
]

export const types = {
  // SET_ANCHORS: 'SET_ANCHORS',

}

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
