import { connect } from 'react-redux'
import SaveZone from 'frontend/components/map/SaveZone'
import {setShowSaveDialog, setAddingZone, addAlert} from 'frontend/actions/AppActions'
import {requestAddZone} from 'frontend/actions/ZoneActions'
import { ERROR } from 'frontend/constants/priorities'

const mapStateToProps = (state) => ({
  mapId: state.app.currentMap,
  points: state.app.tempPoints
})

const mapDispatchToProps = (dispatch) => ({
  requestAddZone: (mapId, name, color, points) => {dispatch(requestAddZone(mapId, name, color, points))},
  cancelSave: () => {
    dispatch(setAddingZone(false))
    dispatch(setShowSaveDialog(false))
  },
  emptyNameError: () => {dispatch(addAlert('Please fill in a zone name', 2000, ERROR))}
})

const mergeProps = (state, dispatch) => ({
    createZone: (name, color) => {
      dispatch.requestAddZone(state.mapId, name, color, state.points)
    },
    cancelSave: () => {dispatch.cancelSave()},
    emptyNameError: () => {dispatch.emptyNameError()}
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(SaveZone)
