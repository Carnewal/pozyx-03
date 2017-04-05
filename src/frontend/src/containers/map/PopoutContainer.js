import { connect } from 'react-redux'
import Popout from 'frontend/components/map/Popout'

const mapStateToProps = (state) => ({
  containerStyle: {
    width: 400,
    position: 'fixed',
    left:state.app.navDrawerOpen ? 250 : 20,
    bottom:0,
    height:210
  }
})

export default connect(
  mapStateToProps
)(Popout)
