import { connect } from 'react-redux'
import Header from 'frontend/components/layout/Header'
import { setCurrentmap } from 'frontend/actions/AppActions'
import { currentMap } from 'frontend/selectors/app'
const mapStateToProps = (state) => ({
  maps: state.map.map((m) => ({ id: m.id, name: m.name})),
  currentMap: currentMap(state)
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentmap: (mapId) => dispatch(setCurrentmap(mapId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
