import { connect } from 'react-redux'
import Map from 'frontend/components/dashboard/Map'
import { getFloorPlan } from 'frontend/selectors/map'

const mapStateToProps = (state) => ({
  positions: state.tag.positions,
  floorPlan: getFloorPlan(state)
})

export default connect(
  mapStateToProps
)(Map)
