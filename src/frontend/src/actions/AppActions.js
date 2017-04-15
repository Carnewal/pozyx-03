export const TOGGLE_TAG_LABEL_FILTER = 'TOGGLE_LABEL_FILTER'
export const SET_TAG_SEARCH = 'SET_TAG_SEARCH'
export const SET_TAG_BATTERY_FILTER = 'SET_TAG_BATTERY_FILTER'
export const SET_TAG_BATTERY_OPERATOR = 'SET_TAG_BATTERY_OPERATOR'
export const ADD_ALERT = 'ADD_ALERT'
export const REMOVE_ALERT = 'REMOVE_ALERT'
export const SET_NAVDRAWER_OPEN = 'SET_NAVDRAWER_OPEN'
export const SET_CURRENTMAP = "SET_CURRENTMAP"
export const SET_INITIAL_LOAD = 'SET_INITIAL_LOAD'

export const toggleTagLabelFilter = (labelId) => ({
  type: TOGGLE_TAG_LABEL_FILTER,
  labelId
})

export const setTagSearch = (search) => ({
  type: SET_TAG_SEARCH,
  search
})

export const setTagBatteryFilter = (percentage) => ({
  type: SET_TAG_BATTERY_FILTER,
  percentage
})
export const setTagBatteryOperator = (operator) => ({
  type: SET_TAG_BATTERY_OPERATOR,
  operator
})
export const addAlert = (message, duration, priority) => ({
  type: ADD_ALERT,
  message,
  duration,
  priority
})
export const removeAlert = (id) => ({
  type: REMOVE_ALERT,
  id
})

export const setNavdrawerOpen = (navDrawerOpen) => ({
  type: SET_NAVDRAWER_OPEN,
  navDrawerOpen
})

export const setCurrentmap = (mapId) => ({
  type: SET_CURRENTMAP,
  mapId
})

export const setInitialLoad = (complete) => ({
  type: SET_INITIAL_LOAD,
  complete
})
