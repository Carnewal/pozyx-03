import { connect } from 'react-redux'
import Map from 'frontend/components/dashboard/Map'
import { getFloorPlan } from 'frontend/selectors/map'
import { getFilteredTags } from 'frontend/selectors/tag'
import { getAnchors } from 'frontend/selectors/anchor'
import { getCurrentMap } from 'frontend/selectors/map'

const mapStateToProps = (state, ownProps) => {

  const { containerWidth } = ownProps
  const map = getCurrentMap(state)
  const mapScaling = containerWidth / map.x
  const containerHeight = map.y * mapScaling
  return {
    tags: getFilteredTags(state),
    anchors: getAnchors(state),
    floorPlan: getFloorPlan(state),
    containerWidth: containerWidth,
    containerHeight: containerHeight,
    mapScaling: mapScaling,
    addingZone: state.app.addingZone
  }
}

export default connect(
  mapStateToProps
)(Map)
