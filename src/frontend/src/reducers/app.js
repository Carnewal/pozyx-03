import { SET_CURRENTMAP } from 'frontend/actions/MapActions'
import { TOGGLE_LABEL_FILTER } from 'frontend/actions/AppActions'

const initialState = {
  currentMap: 4
}

const app = (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENTMAP: {
      return ({currentMap: action.mapId})
    }
    case TOGGLE_LABEL_FILTER: {
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

    default:
      return state
  }
}

export default app
