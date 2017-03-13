import { connect } from 'react-redux'
import Header from 'frontend/components/layout/Header'

const mapStateToProps = (state) => ({
  maps: state.map.map((m) => ({ id: m.mapId, name: m.mapName})),
  currentMap: state.app.currentMap
})

export default connect(
  mapStateToProps
)(Header)
