import { SET_CURRENTMAP } from 'frontend/actions/MapActions'
import { TOGGLE_TAG_LABEL_FILTER, SET_TAG_SEARCH } from 'frontend/actions/AppActions'

const initialState = {
  currentMap: 4
}

const app = (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENTMAP: {
      return ({currentMap: action.mapId})
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

    case SET_TAG_SEARCH: {
      return Object.assign({}, state, { tagSearch: action.search })
    }

    default:
      return state
  }
}

export default app
