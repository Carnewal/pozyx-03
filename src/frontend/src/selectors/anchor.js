
/**
 * Get the amount of anchors for the current map
 */
export const getAnchorsAmount = (state) => state.anchor.reduce(
  (acc, anchor) => (acc + (anchor.mapId === state.app.currentMap ? 1 : 0)),
  0
)

export const getAnchors = (state) =>
  state.anchor.filter((a) => a.mapId === state.app.currentMap)
