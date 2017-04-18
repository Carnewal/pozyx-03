export const SET_ZONES = 'SET_ZONES'
export const REQUEST_ADD_ZONE = 'REQUEST_ADD_ZONE'

export const setZones = (zones) => ({
  type: SET_ZONES,
  zones
})

export const requestAddZone = (mapId, name, color, points) => ({
  type: REQUEST_ADD_ZONE,
  mapId,
  name,
  color,
  points
})
