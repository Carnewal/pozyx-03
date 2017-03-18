import { connect } from 'react-redux'
import Map from 'frontend/components/dashboard/Map'
import { getFloorPlan } from 'frontend/selectors/map'

const mapFilter = (object, state) => {
  if (object.mapId === state.app.currentMap) {
    return true
  } else {
    return false
  }
}

const mapStateToProps = (state) => ({
  positions: state.tag.filter((tag) => mapFilter(tag, state)).map((tag) => ({
    tagId:tag.tagId,
    x: tag.position.x,
    y:tag.position.y,
    z: tag.position.z
  })),
  floorPlan: getFloorPlan(state),
  anchors: state.anchor.filter((anchor) => mapFilter(anchor, state))
  .map((anchor) => ({
    anchorId: anchor.anchorId,
    x: anchor.position.x,
    y: anchor.position.y,
    z: anchor.position.z
  }))
})

export default connect(
  mapStateToProps
)(Map)
