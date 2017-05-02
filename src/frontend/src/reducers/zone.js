import { SET_ZONES, ADD_ZONE, REMOVE_ZONE } from 'frontend/actions/ZoneActions'

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
    case REMOVE_ZONE: {
      const zones = state.slice()
      const index = zones.findIndex((zone) => zone.id === action.zoneId)
      zones.splice(index, 1)
      return [...zones]
    }
    default:
      return state
  }
}

export default zone
