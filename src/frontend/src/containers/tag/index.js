import { connect } from 'react-redux'
import TagTable from 'frontend/components/tag/Table'

const mapStateToProps = (state) => {
  const {currentMap} = state.app
  return {
    tags: state.tag.filter((tag) => tag.mapId === currentMap)
  }
}

export default connect(
  mapStateToProps
)(TagTable)
