import { SET_ANCHORS } from 'frontend/actions/AnchorActions'

const initialState = []

const anchor = (state = initialState, action) => {
  switch(action.type) {
    case SET_ANCHORS: {
      return [...action.anchors]
    }
    default:
      return state
  }
}

export default anchor
