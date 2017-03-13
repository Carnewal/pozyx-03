import { connect } from 'react-redux'
import Dashboard from '../components/dashboard/Dashboard'

import {getAnchorsAmount} from 'frontend/selectors/anchor'
import {getTagsAmount} from 'frontend/selectors/tag'

const mapStateToProps = (state) => {
  return {
    floorPlan: state.map.floorPlan,
    anchorsAmount: getAnchorsAmount(state),
    tagsAmount: getTagsAmount(state),
    currentMap: state.app.currentMap
  }
}

export default connect(
  mapStateToProps
)(Dashboard)
