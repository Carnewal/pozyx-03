import { connect } from 'react-redux'
import Edit from 'frontend/components/tag/Edit'
import { getTag } from 'frontend/selectors/tag'
import { getCurrentMap } from 'frontend/selectors/map'
import { requestAddLabel, requestRemoveLabel } from 'frontend/actions/TagActions'

const mapStateToProps = (state, ownProps) => {
  const tag = getTag(state, ownProps.params.id)
  return {
    tag: tag,
    labels: tag && tag.labels || [],
    currentMap: getCurrentMap(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  addLabel: (mapId, tagId, labelName) =>  { dispatch(requestAddLabel(mapId, tagId, labelName)) },
  removeLabel: (mapId, tagId, labelId) => { dispatch(requestRemoveLabel(mapId, tagId, labelId)) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit)
