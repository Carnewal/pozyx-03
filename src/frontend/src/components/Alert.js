import Snackbar from 'material-ui/Snackbar'
import AlertError from 'material-ui/svg-icons/alert/error'
import AlertWarning from 'material-ui/svg-icons/alert/warning'
import ActionInfo from 'material-ui/svg-icons/action/info'
import ActionDone from 'material-ui/svg-icons/action/done'
import React from 'react'
import { ERROR, WARNING, SUCCESS } from 'frontend/constants/priorities'

const style = {
  ERROR: {
    backgroundColor: "rgba(225,0,0,0.87)"
  },
  WARNING: {
    backgroundColor: "rgba(255,128,0,0.87)"
  },
  SUCCESS: {
    backgroundColor: "rgba(64, 196, 64, 0.87)"
  },
  icon: {
    transform: "translateY(25%)",
    marginRight: "10px",
    color: "#ffffff"
  }
}

export default class Alert extends React.Component {

  constructor(props) {
    super(props);
  }

  icon() {
    switch (this.props.priority) {
      case ERROR: {
        return <AlertError style={style.icon} />
      }
      case WARNING: {
        return <AlertWarning style={style.icon} />
      }
      case SUCCESS: {
        return <ActionDone style={style.icon}/>
      }
      default: {
        return <ActionInfo style={style.icon}/>
      }
    }
  }

  message() {
    return (
    <div key={this.props.id}
    >
      {this.icon()}
      {this.props.message}
    </div>)
  }

  render() {
    return (<Snackbar
      message={this.message()}
      open={this.props.open}
      autoHideDuration={this.props.duration}
      onRequestClose={() => this.props.close()}
      action='Dismiss'
      onActionTouchTap={() => this.props.close()}
      bodyStyle={style[this.props.priority]} />)
  }
}
