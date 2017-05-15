export const SET_TRIGGERS = 'SET_TRIGGERS'
export const REQUEST_CREATE_TRIGGER = 'REQUEST_CREATE_TRIGGER'
export const REQUEST_UPDATE_TRIGGER = 'REQUEST_UPDATE_TRIGGER'

export const setTriggers = (triggers) => ({
  type: SET_TRIGGERS,
  triggers
})

export const updateTrigger = (mapId, id, name, active, json) => ({
  type: REQUEST_UPDATE_TRIGGER,
  mapId, id, name, active, json
})

export const createTrigger = (mapId) => ({
  type: REQUEST_CREATE_TRIGGER,
  mapId
})
