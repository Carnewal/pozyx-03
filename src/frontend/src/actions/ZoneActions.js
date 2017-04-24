export const SET_ZONES = 'SET_ZONES'
export const REQUEST_ADD_ZONE = 'REQUEST_ADD_ZONE'
export const ADD_ZONE = 'ADD_ZONE'
export const REQUEST_REMOVE_ZONE = 'REQUEST_REMOVE_ZONE'
export const REMOVE_ZONE = 'REMOVE_ZONE'

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

export const addZone = (zone) => ({
  type: ADD_ZONE,
  zone
})

export const requestRemoveZone = (zoneId) => ({
  type: REQUEST_REMOVE_ZONE,
  zoneId
})

export const removeZone = (zoneId) => ({
  type: REMOVE_ZONE,
  zoneId
})
