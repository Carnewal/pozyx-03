export const TOGGLE_TAG_LABEL_FILTER = 'TOGGLE_LABEL_FILTER'
export const SET_TAG_SEARCH = 'SET_TAG_SEARCH'
export const SET_TAG_BATTERY_FILTER = 'SET_TAG_BATTERY_FILTER'
export const SET_TAG_BATTERY_OPERATOR = 'SET_TAG_BATTERY_OPERATOR'

export const toggleTagLabelFilter = (labelId) => ({
  type: TOGGLE_TAG_LABEL_FILTER,
  labelId
})

export const setTagSearch = (search) => ({
  type: SET_TAG_SEARCH,
  search
})

export const setTagBatteryFilter = (percentage) => ({
  type: SET_TAG_BATTERY_FILTER,
  percentage
})
export const setTagBatteryOperator = (operator) => ({
  type: SET_TAG_BATTERY_OPERATOR,
  operator
})
