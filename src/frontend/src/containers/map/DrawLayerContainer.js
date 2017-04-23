import { connect } from 'react-redux'
import DrawLayer from 'frontend/components/map/DrawLayer'
import { getZones } from 'frontend/selectors/zone'
import { getCurrentMap } from 'frontend/selectors/map'
import { addAlert, setShowSaveDialog, savePoints} from 'frontend/actions/AppActions'
import { requestAddZone } from 'frontend/actions/ZoneActions'
import { WARNING } from 'frontend/constants/priorities'

const mapStateToProps = (state, ownProps) => {
  const { containerWidth, stage } = ownProps
  const map = getCurrentMap(state)
  const mapScaling = containerWidth / map.x
  const containerHeight = map.y * mapScaling
  return {
    zones: getZones(state),
    containerWidth: containerWidth,
    containerHeight: containerHeight,
    mapScaling: mapScaling,
    addingZone: state.app.addingZone,
    stage: stage,
    mapId: state.app.currentMap
  }
}

const mapDispatchToProps = (dispatch) => ({
     showPointsAlert: () => {dispatch(addAlert('Not enough points created, need 3', 2000, WARNING))},
     showSaveDialog: (points) => {
        dispatch(savePoints(points))
        dispatch(setShowSaveDialog(true))
     }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawLayer)
