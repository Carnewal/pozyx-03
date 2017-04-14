import { SHOW_POSITIONS } from 'frontend/actions/TagActions'

const initialState = []

const tag = (state = initialState, action) => {
  switch(action.type) {
    case SHOW_POSITIONS: {
      const newState = state.slice()
      const positions = action.positions
      newState.map((tag) => {
        if(positions[tag.tagId]) {
          delete positions[tag.tagId].tagId
          tag.position = positions[tag.tagId]
        }
      })
      return newState
    }
    default:
      return state
  }
}

export default tag
