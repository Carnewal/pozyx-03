import { connect } from 'react-redux'
import DrawLayer from 'frontend/components/map/DrawLayer'
import { getFilteredTags } from 'frontend/selectors/tag'
import { getAnchors } from 'frontend/selectors/anchor'
import { getCurrentMap } from 'frontend/selectors/map'

const mapStateToProps = (state, ownProps) => {
  const { containerWidth } = ownProps
  const map = getCurrentMap(state)
  const mapScaling = containerWidth / map.x
  const containerHeight = map.y * mapScaling
  return {
    zones: getZones(state),
    containerWidth: containerWidth,
    containerHeight: containerHeight,
    mapScaling: mapScaling,
    addingZone: state.app.addingZone,

  }
}

export default connect(
  mapStateToProps
)(DrawLayer)
