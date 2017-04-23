import { connect } from 'react-redux'
import Dashboard from '../components/dashboard/Dashboard'

import {setAddingZone,setViewingZones} from 'frontend/actions/AppActions'

import {getAnchorsAmount} from 'frontend/selectors/anchor'
import {getTagsAmount} from 'frontend/selectors/tag'
import {getZonesAmount} from 'frontend/selectors/zone'
import {getFloorPlan} from 'frontend/selectors/map'
const mapStateToProps = (state) => (
  {
    floorPlan: getFloorPlan(state),
    anchorsAmount: getAnchorsAmount(state),
    zonesAmount: getZonesAmount(state),
    tagsAmount: getTagsAmount(state),
    currentMap: state.app.currentMap,
    addingZone: state.app.addingZone,
    showingDialog: state.app.showingDialog
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    setAddingZone: (addingZone) => { dispatch(setAddingZone(addingZone)) },
    setViewingZones: (visible) => { dispatch(setViewingZones(visible)) }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
