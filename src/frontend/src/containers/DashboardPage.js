import { connect } from 'react-redux'
import Dashboard from '../components/dashboard/Dashboard'

const mapStateToProps = (state) => ({
  floorPlan: state.map.floorPlan
})

export default connect(
  mapStateToProps
)(Dashboard)
