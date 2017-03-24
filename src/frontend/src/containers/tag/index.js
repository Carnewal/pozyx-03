import { connect } from 'react-redux'
import TagTable from 'frontend/components/tag/Table'
import {getFilteredTags, getExistingLabels, getLabelFilters, getBatteryFilter, getBatteryOperator} from 'frontend/selectors/tag'
import {
  toggleTagLabelFilter,
  setTagSearch,
  setTagBatteryFilter,
  setTagBatteryOperator
} from 'frontend/actions/AppActions'


const mapStateToProps = (state) => {
  return {
    tags: getFilteredTags(state),
    labels: getExistingLabels(state),
    labelFilters: getLabelFilters(state),
    batteryFilter: getBatteryFilter(state),
    batteryOperator: getBatteryOperator(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLabelClick: (labelId) => dispatch(toggleTagLabelFilter(labelId)),
    onSearchChange: (search) => dispatch(setTagSearch(search)),
    onBatteryFilterChange: (percentage) => dispatch(setTagBatteryFilter(percentage)),
    onBatteryOperatorChange: (operator) => dispatch(setTagBatteryOperator(operator))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagTable)
