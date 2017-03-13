import { connect } from 'react-redux'
import Map from 'frontend/components/dashboard/Map'

const mapStateToProps = (state) => ({
  positions: state.tag.positions,
  floorPlan: state.map.floorPlan
})

export default connect(
  mapStateToProps
)(Map)
