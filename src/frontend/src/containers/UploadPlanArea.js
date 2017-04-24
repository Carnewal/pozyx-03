import { connect } from 'react-redux'
import { uploadFloorplan } from 'frontend/actions/MapActions'
import UploadPlan from 'frontend/components/dashboard/UploadPlan'
import { getCurrentMap } from 'frontend/selectors/map'

const mapStateToProps = (state) => ({
  currentMap: state.app.currentMap,
  map: getCurrentMap(state)
})
const mapDispatchToProps = (dispatch) => ({
  UploadFloorplan: (file, currentMap) =>  { dispatch(uploadFloorplan(file, currentMap)) }
})

const mergeProps = (state, dispatch) => ({
  UploadFloorplan: (file) => { dispatch.UploadFloorplan(file, state.currentMap) },
  map: state.map
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UploadPlan)
