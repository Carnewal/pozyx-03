import React, {PropTypes} from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MapsLayers from 'material-ui/svg-icons/maps/layers'
import Check from 'material-ui/svg-icons/navigation/check'
import Menu from 'material-ui/svg-icons/navigation/menu'
import ViewModule from 'material-ui/svg-icons/action/view-module'
import {white} from 'material-ui/styles/colors'

class Header extends React.Component {

  uploadPlattegrond() {
  }

  render() {
    const {styles, handleChangeRequestNavDrawer} = this.props

    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57
      },
      menuButton: {
        marginLeft: 10
      },
      iconsRightContainer: {
        marginLeft: 20
      }
    }

    return (
        <div>
            <AppBar
              style={{...styles, ...style.appBar}}
              iconElementLeft={
                  <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
                    <Menu color={white} />
                  </IconButton>
              }
              iconElementRight={
                <div style={style.iconsRightContainer}>
                  <IconMenu color={white}
                            iconButtonElement={
                              <IconButton>
                                <MapsLayers color={white}></MapsLayers>
                              </IconButton>
                            }
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    {this.props.maps.map((map) => <MenuItem
                      key={map.id}
                      onClick={() => this.props.setCurrentmap(map.id)}
                      primaryText={map.name}
                      leftIcon={map.id == this.props.currentMap ? <Check /> : <span/> }/>
                    )}

                  </IconMenu>
                  <IconMenu color={white}
                            iconButtonElement={
                              <IconButton><MoreVertIcon color={white}/></IconButton>
                            }
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <MenuItem primaryText='Plattegrond uploaden' onClick={() => this.uploadPlattegrond()}/>
                  </IconMenu>
                </div>
              }
            />
          </div>
      )
  }
}

Header.propTypes = {
  maps: PropTypes.array,
  currentMap: PropTypes.number,
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func
}

export default Header
