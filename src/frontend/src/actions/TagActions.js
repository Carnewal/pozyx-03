export const SET_TAGS = "SET_TAGS"
export const setTags = (tags) => ({
  type: SET_TAGS,
  tags
})

export const SHOW_POSITIONS = "SHOW_POSITIONS"
export const showPositions = (positions) => ({
  type: SHOW_POSITIONS,
  positions
})

export const ADD_LABEL = "ADD_LABEL" // Use in reducer
export const addLabel = (tagId, label) => ({
  type: ADD_LABEL,
  tagId,
  label
})
export const REQUEST_ADD_LABEL = "REQUEST_ADD_LABEL" // Use in sagas
export const requestAddLabel = (mapId, tagId, labelName) => ({
  type: REQUEST_ADD_LABEL,
  mapId, tagId, labelName
})

export const REMOVE_LABEL = "REMOVE_LABEL" // Use in reducer
export const removeLabel = (tagId, labelId) => ({
  type: REMOVE_LABEL,
  tagId,  labelId
})
export const REQUEST_REMOVE_LABEL = "REQUEST_REMOVE_LABEL" // Use in sagas
export const requestRemoveLabel = (mapId, tagId, labelId) => ({
  type: REQUEST_REMOVE_LABEL,
  mapId, tagId, labelId
})
