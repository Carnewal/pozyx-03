import { connect } from 'react-redux'
import ZoneLayer from 'frontend/components/map/ZoneLayer'
import { getZones } from 'frontend/selectors/zone'
import { getCurrentMap } from 'frontend/selectors/map'
import { requestRemoveZone } from 'frontend/actions/ZoneActions'

const mapStateToProps = (state, ownProps) => {
  const { containerWidth } = ownProps
  const map = getCurrentMap(state)
  const mapScaling = containerWidth / map.x
  return {
    zones: getZones(state),
    mapScaling: mapScaling,
    removing: state.app.removingZones
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestRemoveZone: (zoneId) => dispatch(requestRemoveZone(zoneId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    areStatesEqual: (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
  }
)(ZoneLayer)
