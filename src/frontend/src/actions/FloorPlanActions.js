export const SET_FLOORPLAN = "SET_FLOORPLAN"
export const setFloorplan = (file, currentMap) => ({
  type: SET_FLOORPLAN,
  file,
  currentMap
})

export const UPLOAD_FLOORPLAN = "UPLOAD_FLOORPLAN"
export const uploadFloorplan = (file, currentMap) => ({
  type: UPLOAD_FLOORPLAN,
  file,
  currentMap
})
