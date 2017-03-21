export const TOGGLE_TAG_LABEL_FILTER = 'TOGGLE_LABEL_FILTER'
export const SET_TAG_SEARCH = 'SET_TAG_SEARCH'

export const toggleTagLabelFilter = (labelId) => ({
  type: TOGGLE_TAG_LABEL_FILTER,
  labelId
})

export const setTagSearch = (search) => ({
  type: SET_TAG_SEARCH,
  search
})
