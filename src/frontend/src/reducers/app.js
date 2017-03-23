import { SET_CURRENTMAP } from 'frontend/actions/MapActions'
import { ADD_ALERT, REMOVE_ALERT } from 'frontend/actions/AppActions'
import { getCurrentAlertIndex } from 'frontend/selectors/app'

const initialState = {
  currentMap: 4,
  alerts: []
}

const sortFunction = (a1, a2) => {
  const diff = priorityNumber(a1.priority) - priorityNumber(a2.priority)
    console.log(a1, a2,diff, a1.id-a2.id,priorityNumber(a1.priority),priorityNumber(a2.priority))
  if (diff == 0) {
    return a1.id - a2.id
  }
  return diff
}

const priorityNumber = (priority) => {
  switch(priority) {
    case 'error': {
      return 0
    }
    case 'warning': {
      return 1
    }
    default: {
      return 2
    }
  }
}

const app = (state = initialState, action) => {
  switch(action.type) {
  case SET_CURRENTMAP: {
    return Object.assign({}, state, {currentMap: action.mapId})
  }
  case ADD_ALERT: {
    let newState = Object.assign({}, state)
    newState.alerts.push({id: Date.now(), message: action.message, duration: action.duration, priority: action.priority})
    newState.alerts = newState.alerts.slice(0,1).concat(newState.alerts.slice(1,newState.alerts.length).sort(sortFunction))
    return newState
  }
  case REMOVE_ALERT: {
    let newState = Object.assign({}, state)
    delete newState.alerts.splice(0, 1)
    return newState
  }
  default:
    return state
  }
}

export default app
