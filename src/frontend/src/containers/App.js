import React, { PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth'
import Header from 'frontend/containers/layout/HeaderContainer'
import LeftDrawer from 'frontend/components/layout/LeftDrawer'
import ThemeDefault from '../theme-default'
import Data from '../data'
import menuItems from 'frontend/constants/menu-items'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      navDrawerOpen: true
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE})
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    })
  }

  render() {
    const { navDrawerOpen } = this.state
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
          <Header styles={styles.header}
                  handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>

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
  width: PropTypes.number
}

export default withWidth()(App)
