import { connect } from 'react-redux'
import Dashboard from '../components/dashboard/Dashboard'

const mapStateToProps = (state) => {
  const {currentMap} = state.app
  const {floorPlan} = state.map
  return {
    floorPlan: state.map.floorPlan,
    anchorsAmount: state.anchor.reduce((acc, anchor) => (acc + (anchor.mapId === currentMap ? 1 : 0)), 0),
    tagsAmount: 5,
    currentMap: currentMap
  }
}

export default connect(
  mapStateToProps
)(Dashboard)
