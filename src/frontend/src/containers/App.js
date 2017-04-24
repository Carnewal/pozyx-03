import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth'
import Header from 'frontend/containers/layout/HeaderContainer'
import LeftDrawer from 'frontend/components/layout/LeftDrawer'
import ThemeDefault from '../theme-default'
import menuItems from 'frontend/constants/menu-items'
import Alert from 'frontend/containers/AlertContainer'
import {setNavdrawerOpen} from 'frontend/actions/AppActions'

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.props.setNavdrawerOpen(nextProps.width === LARGE)
    }
  }

  render() {
    const { navDrawerOpen, setNavdrawerOpen } = this.props
    const paddingLeftDrawerOpen = 236

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    }
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <Alert />
          <Header styles={styles.header}
                  handleChangeRequestNavDrawer={() => { setNavdrawerOpen(!navDrawerOpen) }}/>

            <LeftDrawer navDrawerOpen={navDrawerOpen}
                        menus={menuItems}
                        username='User Admin'/>

            <div style={styles.container}>
              {this.props.children}
            </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number,
  navDrawerOpen: PropTypes.bool,
  setNavdrawerOpen: PropTypes.func
}


export default connect(
  (state) => ({navDrawerOpen: state.app.navDrawerOpen}),
  (dispatch) => ({setNavdrawerOpen: (open) => { dispatch(setNavdrawerOpen(open))}})
)(withWidth()(App))
