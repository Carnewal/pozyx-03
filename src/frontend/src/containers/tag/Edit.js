import { connect } from 'react-redux'
import Edit from 'frontend/components/tag/Edit'
import { getTag } from 'frontend/selectors/tag'

const mapStateToProps = (state, ownProps) => ({
  tag: getTag(state, ownProps.params.id)
})

export default connect(
  mapStateToProps
)(Edit)
