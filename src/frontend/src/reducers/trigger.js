import {SET_TRIGGERS} from 'frontend/actions/TriggerActions'

const initialState = []
const trigger = (state = initialState, action) => {
  switch(action.type) {
    case SET_TRIGGERS: {
      return [...action.triggers]
    }
    default:
      return state
  }
}

export default trigger
