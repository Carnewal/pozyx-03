import { connect } from 'react-redux'
import { setFloorplan } from '../actions/FloorPlanActions'
import UploadPlan from '../components/dashboard/UploadPlan'

const mapStateToProps = (state) => ({
  currentMap: state.app.currentMap
})
const mapDispatchToProps = (dispatch) => ({
  UploadFloorplan: (file, currentMap) =>  { dispatch(setFloorplan(file, currentMap)) }
})

const mergeProps = (state, dispatch) => ({
  UploadFloorplan: (file) => { dispatch.UploadFloorplan(file, state.currentMap) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UploadPlan)
