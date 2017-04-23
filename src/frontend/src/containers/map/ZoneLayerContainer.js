import { connect } from 'react-redux'
import ZoneLayer from 'frontend/components/map/ZoneLayer'
import { getZones } from 'frontend/selectors/zone'
import { getCurrentMap } from 'frontend/selectors/map'

const mapStateToProps = (state, ownProps) => {
  const { containerWidth } = ownProps
  const map = getCurrentMap(state)
  const mapScaling = containerWidth / map.x
  return {
    zones: getZones(state),
    mapScaling: mapScaling
  }
}

export default connect(
  mapStateToProps,
  null,
  null,
  {
    areStatesEqual: (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
  }
)(ZoneLayer)
