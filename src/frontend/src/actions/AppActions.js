export const TOGGLE_TAG_LABEL_FILTER = 'TOGGLE_LABEL_FILTER'
export const SET_TAG_SEARCH = 'SET_TAG_SEARCH'
export const SET_TAG_BATTERY_FILTER = 'SET_TAG_BATTERY_FILTER'
export const SET_TAG_BATTERY_OPERATOR = 'SET_TAG_BATTERY_OPERATOR'
export const ADD_ALERT = 'ADD_ALERT'
export const REMOVE_ALERT = 'REMOVE_ALERT'
export const SET_NAVDRAWER_OPEN = 'SET_NAVDRAWER_OPEN'
export const SET_CURRENTMAP = "SET_CURRENTMAP"
export const SET_INITIAL_LOAD = 'SET_INITIAL_LOAD'
export const SET_ADDING_ZONE = 'SET_ADDING_ZONE'
export const SET_VIEWING_ZONES = 'SET_VIEWING_ZONES'
export const SET_SHOW_SAVE_DIALOG = 'SET_SHOW_SAVE_DIALOG'
export const SAVE_POINTS = 'SAVE_POINTS'
export const SET_REMOVING_ZONES = 'SET_REMOVING_ZONES'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'

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

export const setAddingZone = (adding) => ({
  type: SET_ADDING_ZONE,
  adding
})

export const setViewingZones = (visible) => ({
  type: SET_VIEWING_ZONES,
  visible
})

export const setShowSaveDialog = (show) => ({
  type: SET_SHOW_SAVE_DIALOG,
  show
})

export const savePoints = (points) => ({
  type: SAVE_POINTS,
  points
})

export const setRemovingZones = (remove) => ({
  type: SET_REMOVING_ZONES,
  remove
})

export const removeNotification = (id) => ({
  type: REMOVE_NOTIFICATION,
  id
})

export const addNotification = (notification) => ({
  type: ADD_NOTIFICATION,
  notification
})
