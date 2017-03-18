import { connect } from 'react-redux'
import { uploadFloorplan } from 'frontend/actions/MapActions'
import UploadPlan from 'frontend/components/dashboard/UploadPlan'

const mapStateToProps = (state) => ({
  currentMap: state.app.currentMap
})
const mapDispatchToProps = (dispatch) => ({
  UploadFloorplan: (file, currentMap) =>  { dispatch(uploadFloorplan(file, currentMap)) }
})

const mergeProps = (state, dispatch) => ({
  UploadFloorplan: (file) => { dispatch.UploadFloorplan(file, state.currentMap) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UploadPlan)
