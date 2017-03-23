export const ADD_ALERT = "ADD_ALERT"
export const addAlert = (message, duration, priority) => ({
  type: ADD_ALERT,
  message,
  duration,
  priority
})

export const REMOVE_ALERT = "REMOVE_ALERT"
export const removeAlert = (id) => ({
  type: REMOVE_ALERT,
  id
})
