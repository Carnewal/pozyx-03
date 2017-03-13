import { connect } from 'react-redux'
import Map from 'frontend/components/dashboard/Map'
import { getFloorPlan } from 'frontend/selectors/map'

const mapStateToProps = (state) => ({
  positions: state.tag.map((tag) => ({
    tagId:tag.tagId,
    x: tag.position.x,
    y:tag.position.y,
    z: tag.position.z
  })),
  floorPlan: getFloorPlan(state)
})

export default connect(
  mapStateToProps
)(Map)
