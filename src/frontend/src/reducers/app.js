import { SET_CURRENTMAP } from 'frontend/actions/AppActions'
import {
  TOGGLE_TAG_LABEL_FILTER,
  SET_TAG_SEARCH, SET_TAG_BATTERY_FILTER,
  SET_TAG_BATTERY_OPERATOR,
  ADD_ALERT,
  REMOVE_ALERT,
  SET_INITIAL_LOAD } from 'frontend/actions/AppActions'
import { getCurrentAlertIndex } from 'frontend/selectors/app'
import { ERROR, WARNING, SUCCESS } from 'frontend/constants/priorities'

const initialState = {
  alerts: [],
  initialLoad: false
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
      let newState = Object.assign({}, state)
      newState.alerts.push({id: Date.now(), message: action.message, duration: action.duration, priority: action.priority})
      newState.alerts = newState.alerts
        .slice(0,1)
        .concat(newState.alerts.slice(1,newState.alerts.length)
        .sort(sortFunction))
      return newState
    }
    case REMOVE_ALERT: {
      let newState = Object.assign({}, state)
      delete newState.alerts.splice(0, 1)
      return newState
    }
    case SET_INITIAL_LOAD: {
      return Object.assign({}, state, { initialLoad: action.complete })
    }

    default:
      return state
  }
}

export default app
