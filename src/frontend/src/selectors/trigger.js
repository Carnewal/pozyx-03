export const getTriggers = (state) => state.trigger.filter(
    (trigger) => trigger.mapId === state.app.currentMap
)
