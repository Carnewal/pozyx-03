import { connect } from 'react-redux'
import Dashboard from '../components/dashboard/Dashboard'

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
    currentMap: state.app.currentMap
  }
)

export default connect(
  mapStateToProps
)(Dashboard)
