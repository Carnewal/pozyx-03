import { connect } from 'react-redux'
import Map from 'frontend/components/dashboard/Map'
import { getFloorPlan } from 'frontend/selectors/map'
import { getCurrentMap } from 'frontend/selectors/map'

const mapStateToProps = (state, ownProps) => {

  const { containerWidth } = ownProps
  const map = getCurrentMap(state)
  const mapScaling = containerWidth / map.x
  const containerHeight = map.y * mapScaling
  return {
    floorPlan: getFloorPlan(state),
    containerWidth: containerWidth,
    containerHeight: containerHeight,
    addingZone: state.app.addingZone,
    mapId: state.app.currentMap,
    viewingZones: state.app.viewingZones
  }
}

export default connect(
  mapStateToProps
)(Map)
