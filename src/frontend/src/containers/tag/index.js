import { connect } from 'react-redux'
import TagTable from 'frontend/components/tag/Table'
import {getFilteredTags, getExistingLabels, getLabelFilters} from 'frontend/selectors/tag'
import { toggleLabelFilter } from 'frontend/actions/AppActions'


const mapStateToProps = (state) => {
  return {
    tags: getFilteredTags(state),
    labels: getExistingLabels(state),
    labelFilters: getLabelFilters(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLabelClick: (labelId) => dispatch(toggleLabelFilter(labelId))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagTable)
