import { connect } from 'react-redux'
import LiveLayer from 'frontend/components/map/LiveLayer'
import { getFilteredTags } from 'frontend/selectors/tag'
import { getAnchors } from 'frontend/selectors/anchor'
import { getCurrentMap } from 'frontend/selectors/map'

const mapStateToProps = (state, ownProps) => {
  const { containerWidth } = ownProps
  const map = getCurrentMap(state)
  const mapScaling = containerWidth / map.x
  return {
    tags: getFilteredTags(state),
    anchors: getAnchors(state),
    mapScaling: mapScaling
  }
}

export default connect(
  mapStateToProps
)(LiveLayer)
