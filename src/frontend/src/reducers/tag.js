import { SHOW_POSITIONS, SET_TAGS } from 'frontend/actions/TagActions'

const initialState = []

const tag = (state = initialState, action) => {
  switch(action.type) {
    case SET_TAGS: {
      return [...action.tags]
    }
    case SHOW_POSITIONS: {
      const newState = state.slice()
      const positions = action.positions
      newState.map((tag) => {
        if(positions[tag.id]) {
          delete positions[tag.id].id
          tag.position = positions[tag.id]
        }
      })
      return newState
    }
    default:
      return state
  }
}

export default tag
