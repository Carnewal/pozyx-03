
/**
 * Get the amount of tags for the current map
 */
export const getTagsAmount = (state) => state.tag.reduce(
  (acc, tag) => (acc + (tag.mapId === state.app.currentMap ? 1 : 0)),
  0
)
/**
 * Get a tag by Id
 */
export const getTag = (state, id) => state.tag && state.tag.find(
  (t) => t.tagId === parseInt(id)
)

/**
 * Get the tags for the selected map
 */
export const getTags = (state) => state.tag && state.tag.filter(
  (tag) => tag.mapId === state.app.currentMap
) || []

// Returns an object of all unique labels for the current map.
// Key: labelName, Val: the label object
export const getExistingLabels = (state) => {
  const labels = {}
  getTags(state).forEach(
    (tag) => tag.labels && tag.labels.forEach(
      (label) => labels[label.labelName] = label
    )
  )
  return labels
}

// Get the labels selected by the user
export const getLabelFilters = (state) => state.app.tagLabelFilters || []

// Get the label Ids on a tag
export const getTagLabelIds = (tag) => tag.labels && tag.labels.map((l) => l.labelId) || []

// Get the label names on a tag
export const getTagLabelNames = (tag) => tag.labels && tag.labels.map((l) => l.labelName) || []

export const getBatteryFilter = (state) => state.app.tagBatteryFilter === undefined
  ? 0.5
  : state.app.tagBatteryFilter

export const getBatteryOperator = (state) => state.app.tagBatteryOperator || 0

// Filter tag labels
// Returns true if the tag's labelIds exist inside the given filters array
const labelFilter = (filters) => (tag) =>
filters.length === 0 || filters.every((f) => getTagLabelIds(tag).includes(f))

// Filter tag by search
// Returns true if the tag's:
// - name contains the search term
// - id matches the search term
// - any label matches the search term
const searchFilter = (search) => (tag) =>
!search ||
tag.tagName.toLowerCase().includes(search.toLowerCase()) ||
tag.tagId === parseInt(search) ||
getTagLabelNames(tag).find((lbl) => lbl.toLowerCase().includes(search.toLowerCase()))

// Operators:
// 0 = OFF
// 1 = > (more than)
// 2 = < (less than)
const batteryFilter = (percentage, operator) => (tag) => {
  if(!operator || operator === 0) {
    return true
  } else if(operator === 1) {
    return tag.battery > percentage
  } else if(operator === 2) {
    return tag.battery < percentage
  }
}

// Filters the tags
export const getFilteredTags = (state) => getTags(state)
    .filter(labelFilter(getLabelFilters(state)))
    .filter(searchFilter(state.app.tagSearch || null))
    .filter(batteryFilter(getBatteryFilter(state), getBatteryOperator(state)))
    || []
