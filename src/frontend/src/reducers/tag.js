import { SHOW_POSITIONS } from '../actions/TagActions'

const initialState = {}

const tag = (state = initialState, action) => {
  switch(action.type) {
    case SHOW_POSITIONS:
      return {...state, positions: action.positions}
    default:
      return state
  }
}

export default tag
