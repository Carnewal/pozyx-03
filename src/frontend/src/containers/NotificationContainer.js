import { connect } from 'react-redux'
import NotificationButton from 'frontend/components/NotificationButton'
import {removeNotification} from 'frontend/actions/AppActions'

const mapStateToProps = (state) => ({
  notifications: state.app.notifications
})

const mapDispatchToProps = (dispatch) => ({
  removeNotification: (id) => dispatch(removeNotification(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationButton)
