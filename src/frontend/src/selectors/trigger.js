export const getTriggers = (state) => state.trigger.filter(
    (trigger) => trigger.mapId === state.app.currentMap
)

export const getNewTrigger = (state) => state.app.newTrigger

export const getBuildingTriggerId = (state) => state.app.buildingTrigger

export const getBuildingTrigger = (state) => state.trigger.find((t) => t.id === getBuildingTrigger(state))
