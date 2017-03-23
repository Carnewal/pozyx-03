import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'
import { getAlertsAmount, getCurrentAlert } from 'frontend/selectors/app'
import { removeAlert } from 'frontend/actions/AppActions'

const mapStateToProps = (state) => {
  const alert = getCurrentAlert(state)
  return {
    open: getAlertsAmount(state) > 0,
    message: alert.message,
    autoHideDuration: alert.duration,
    priority: alert.priority,
    action: 'Dismiss'
  }
}
const mapDispatchToProps = (dispatch) => ({
  onRequestClose: () => dispatch(removeAlert()),
  onActionTouchTap: () => dispatch(removeAlert())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Snackbar)
