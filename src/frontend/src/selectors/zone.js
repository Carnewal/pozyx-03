/**
 * Get the amount of zones for the current map
 */
export const getZonesAmount = (state) => state.zone.reduce(
    (acc, zone) => (acc + (zone.mapId === state.app.currentMap ? 1 : 0)),
    0
)

/**
 * Get the zones for the selected map
 */
export const getZones = (state) => state.zone && state.zone.filter(
  (zone) => zone.mapId === state.app.currentMap
) || []
