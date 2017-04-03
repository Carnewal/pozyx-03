import { connect } from 'react-redux'
import Map from 'frontend/components/dashboard/Map'
import { getFloorPlan } from 'frontend/selectors/map'
import { getFilteredTags } from 'frontend/selectors/tag'
import { getAnchors } from 'frontend/selectors/anchor'
import { getCurrentMap } from 'frontend/selectors/map'

const mapStateToProps = (state) => ({
  map: getCurrentMap(state),
  tags: getFilteredTags(state),
  floorPlan: getFloorPlan(state),
  anchors: getAnchors(state)
})

export default connect(
  mapStateToProps
)(Map)
