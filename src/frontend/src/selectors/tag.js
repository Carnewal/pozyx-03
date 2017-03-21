
/**
 * Get the amount of tags for the current map
 */
export const getTagsAmount = (state) => state.tag.reduce(
  (acc, tag) => (acc + (tag.mapId === state.app.currentMap ? 1 : 0)),
  0
)

export const getTags = (state) => state.tag && state.tag.filter(
  (tag) => tag.mapId === state.app.currentMap
) || []

// Returns an object of all labels for the current map.
// Key: labelName, Val: the label
export const getExistingLabels = (state) => {
  let labels = {}
  getTags(state).forEach(
    (tag) => tag.labels && tag.labels.forEach(
      (label) => labels[label.labelName] = label
    )
  )
  return labels
}

export const getLabelFilters = (state) => state.app.tagLabelFilters || []

export const getTagLabelIds = (tag) => tag.labels.map((l) => l.labelId)

const labelFilter = (filters) => (tag) =>
  filters.length === 0 || filters.every((f) => getTagLabelIds(tag).includes(f))

const searchFilter = (search) => (tag) =>
  !search ||
  tag.tagName.toLowerCase().includes(search.toLowerCase()) ||
  tag.tagId === parseInt(search)

export const getFilteredTags = (state) => getTags(state)
    .filter(labelFilter(getLabelFilters(state)))
    .filter(searchFilter(state.app.tagSearch || null))
