import { SET_CURRENTMAP } from 'frontend/actions/AppActions'
import { REMOVE_LABEL } from 'frontend/actions/TagActions'
import {
  TOGGLE_TAG_LABEL_FILTER,
  SET_TAG_SEARCH,
  SET_TAG_BATTERY_FILTER,
  SET_TAG_BATTERY_OPERATOR,
  SET_NAVDRAWER_OPEN,
  ADD_ALERT,
  REMOVE_ALERT,
  SET_INITIAL_LOAD,
  SET_ADDING_ZONE,
  SET_VIEWING_ZONES,
  SET_SHOW_SAVE_DIALOG,
  SAVE_POINTS,
  SET_REMOVING_ZONES,
  REMOVE_NOTIFICATION,
  ADD_NOTIFICATION
} from 'frontend/actions/AppActions'
import { getCurrentAlertIndex } from 'frontend/selectors/app'
import { ERROR, WARNING, SUCCESS } from 'frontend/constants/priorities'


const initialState = {
  alerts: [],
  navDrawerOpen: true,
  initialLoad: false,
  addingZone: false,
  viewingZones: true,
  showingDialog: false,
  tempPoints: [],
  removingZones: false,
  notifications: []
}

const resetState = {
  alerts: [],
  tagLabelFilters: null
}

const sortFunction = (a1, a2) => {
  const diff = priorityNumber(a1.priority) - priorityNumber(a2.priority)
  if (diff == 0) {
    return a1.id - a2.id
  }
  return diff
}

const priorityNumber = (priority) => {
  switch(priority) {
    case ERROR: {
      return 0
    }
    case SUCCESS: {
      return 1
    }
    case WARNING: {
      return 2
    }
    default: {
      return 3
    }
  }
}

const app = (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENTMAP: {
      return Object.assign({}, state, resetState, {currentMap: action.mapId})
    }
    case REMOVE_LABEL: {
      return Object.assign({}, state, {tagLabelFilters: state.tagLabelFilters.filter((label) => label !== action.labelName)})
    }
    case TOGGLE_TAG_LABEL_FILTER: {
      const labelSet = new Set(state.tagLabelFilters || [])
      return Object.assign({}, state, {
        tagLabelFilters: [
          ...(labelSet.delete(action.labelId)
            ? labelSet
            : labelSet.add(action.labelId)
          )
        ]
      })
    }
    case SET_TAG_BATTERY_FILTER: {
      return Object.assign({}, state, { tagBatteryFilter: action.percentage })
    }
    case SET_TAG_BATTERY_OPERATOR: {
      return Object.assign({}, state, { tagBatteryOperator: action.operator })

    }
    case SET_TAG_SEARCH: {
      return Object.assign({}, state, { tagSearch: action.search })
    }
    case ADD_ALERT: {
      const newState = Object.assign({}, state)
      newState.alerts.push({id: Date.now(), message: action.message, duration: action.duration, priority: action.priority})
      newState.alerts = newState.alerts
        .slice(0,1)
        .concat(newState.alerts.slice(1,newState.alerts.length)
        .sort(sortFunction))
      return newState
    }
    case REMOVE_ALERT: {
      const newState = Object.assign({}, state)
      delete newState.alerts.splice(0, 1)
      return newState
    }
    case SET_NAVDRAWER_OPEN: {
      return Object.assign({}, state, { navDrawerOpen: action.navDrawerOpen})
    }
    case SET_INITIAL_LOAD: {
      return Object.assign({}, state, { initialLoad: action.complete })
    }
    case SET_ADDING_ZONE: {
      return Object.assign({}, state, {addingZone: action.adding})
    }
    case SET_VIEWING_ZONES: {
      return Object.assign({}, state, {viewingZones: action.visible})
    }
    case SET_SHOW_SAVE_DIALOG:{
      return Object.assign({}, state, {showingDialog: action.show})
    }
    case SAVE_POINTS:{
      return Object.assign({}, state, {tempPoints: action.points})
    }
    case SET_REMOVING_ZONES: {
      return Object.assign({}, state, {removingZones: action.remove})
    }
    case REMOVE_NOTIFICATION: {
      const notifications = state.notifications.slice()
      const index = notifications.findIndex((notification) => notification.id === action.id)
      notifications.splice(index, 1)
      return Object.assign({}, state, {notifications})
    }
    case ADD_NOTIFICATION: {
      const notifications = state.notifications.slice()
      notifications.push(action.notification)
      return Object.assign({}, state, {notifications})
    }
    default:
      return state
  }
}

export default app
