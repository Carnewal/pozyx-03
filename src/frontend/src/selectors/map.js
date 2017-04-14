// Get the current map object
export const getCurrentMap = (state) => state.map.find(
  (map) => map.id === state.app.currentMap
) || {}

export const getFloorPlan = (state) => getCurrentMap(state).floorPlan
