
/**
 * Get the amount of anchors for the current map
 */
export const getAnchorsAmount = (state) => state.anchor.reduce(
  (acc, anchor) => (acc + (anchor.mapId === state.app.currentMap ? 1 : 0)),
  0
)
