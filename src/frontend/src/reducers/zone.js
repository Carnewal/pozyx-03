import { SET_ZONES } from 'frontend/actions/ZoneActions'

const initialState = []

const zone = (state = initialState, action) => {
  switch(action.type) {
    case SET_ZONES: {
      return [...action.zones]
    }
    default:
      return state
  }
}

export default zone
