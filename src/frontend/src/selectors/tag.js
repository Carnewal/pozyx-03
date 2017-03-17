
/**
 * Get the amount of tags for the current map
 */
export const getTagsAmount = (state) => state.anchor.reduce(
  (acc, tag) => (acc + (tag.mapId === state.app.currentMap ? 1 : 0)),
  0
)
