import React, {PropTypes} from 'react'
import IconButton from 'material-ui/IconButton'
import Notifications from 'material-ui/svg-icons/social/notifications'
import NotificationsActive from 'material-ui/svg-icons/social/notifications-active'
import {white} from 'material-ui/styles/colors'
import Popover from 'material-ui/Popover'
import {List, ListItem} from 'material-ui/List'
import Done from 'material-ui/svg-icons/action/done'

const style = {
  notifications: {
    cursor: 'hand'
  },
  url: {
    color: 'black'
  }
}

export default class NotificationButton extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  handleTouchTap(event) {
    event.preventDefault()

    if (this.props.notifications.length > 0) {
      this.setState({
        open: true,
        anchorEl: event.currentTarget,
      })
    }
  }

  removeNotification(notification) {
    if (this.props.notifications.length == 1) {
      this.setState({open: false})
    }

    this.props.removeNotification(notification.id)
  }

  handleRequestClose() {
    this.setState({
      open: false,
    })
  }

  render() {
    return (
      <span>
        <IconButton onTouchTap={(e) => this.handleTouchTap(e)}>
          {
            this.props.notifications.length > 0 ?
            <NotificationsActive color={white} style={style.notifications} /> :
            <Notifications color={white} style={style.notifications} />
          }
        </IconButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={() => this.handleRequestClose()}>
          <List>
            {this.props.notifications.map((notification) => {
                return <ListItem
                  primaryText={<a style={style.url} href={notification.url} target='_blank'>{notification.name}</a>}
                  secondaryText={notification.time}
                  rightIconButton={
                    <IconButton onTouchTap={() => this.removeNotification(notification)}>
                      <Done/>
                    </IconButton>
                  }
                />
              }
            )}
          </List>
        </Popover>
      </span>
    )
  }

}

NotificationButton.propTypes = {
  notifications: PropTypes.array,
  removeNotification: PropTypes.func
}
