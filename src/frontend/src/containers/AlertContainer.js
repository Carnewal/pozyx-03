import { connect } from 'react-redux'
import Alert from 'frontend/components/Alert'
import { getAlertsAmount, getCurrentAlert } from 'frontend/selectors/app'
import { removeAlert } from 'frontend/actions/AppActions'
import React from 'react'

const mapStateToProps = (state) => {
  const alert = getCurrentAlert(state)
  return {
    open: getAlertsAmount(state) > 0,
    message:  alert.message,
    duration: alert.duration,
    priority: alert.priority,
    id: alert.id
  }
}
const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch(removeAlert())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alert)
