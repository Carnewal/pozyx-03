import { connect } from 'react-redux'
import Header from 'frontend/components/layout/Header'
import { setCurrentmap } from 'frontend/actions/MapActions'

const mapStateToProps = (state) => ({
  maps: state.map.map((m) => ({ id: m.mapId, name: m.mapName})),
  currentMap: state.app.currentMap
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentmap: (mapId) => dispatch(setCurrentmap(mapId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
