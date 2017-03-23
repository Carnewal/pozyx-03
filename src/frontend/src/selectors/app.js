export const currentMap = (state) => state.app.currentMap

export const getAlertsAmount = (state) => state.app.alerts.length

export const getCurrentAlert = (state) => {
  if (getAlertsAmount(state) === 0) {
    return {
      message:'test',
      duration:'0',
      priority:'none'
    }
  }
  return state.app.alerts[0]
}
