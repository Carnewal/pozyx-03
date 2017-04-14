import { connect } from 'react-redux'
import Header from 'frontend/components/layout/Header'
import { setCurrentmap } from 'frontend/actions/AppActions'

const mapStateToProps = (state) => ({
  maps: state.map.map((m) => ({ id: m.id, name: m.name})),
  currentMap: state.app.currentMap
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentmap: (mapId) => dispatch(setCurrentmap(mapId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
