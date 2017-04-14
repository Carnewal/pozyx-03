export const currentMap = (state) => state.app.currentMap

export const getAlertsAmount = (state) => state.app.alerts.length

export const getCurrentAlert = (state) => {
  if (getAlertsAmount(state) === 0) {
    return {
      message:'',
      duration:'0'
    }
  }
  return state.app.alerts[0]
}

export const isInitialLoadComplete = (state) => state.app.initialLoad
