import { SET_CURRENTMAP } from 'frontend/actions/MapActions'

const initialState = {
  currentMap: 4
}

const app = (state = initialState, action) => {
  switch(action.type) {
  case SET_CURRENTMAP: {
    return Object.assign({}, state, {currentMap: action.mapId})
  }
    default:
      return state
  }
}

export default app
