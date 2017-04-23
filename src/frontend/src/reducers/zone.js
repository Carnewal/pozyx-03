import { SET_ZONES, ADD_ZONE } from 'frontend/actions/ZoneActions'

const initialState = []

const zone = (state = initialState, action) => {
  switch(action.type) {
    case SET_ZONES: {
      return [...action.zones]
    }
    case ADD_ZONE: {
      const zones = state.slice()
      zones.push(action.zone)
      return [...zones]
    }
    default:
      return state
  }
}

export default zone
