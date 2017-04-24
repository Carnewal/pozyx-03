import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import Map from 'frontend/containers/MapContainer'
import {Link} from 'react-router'

export default class Popout extends React.Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { containerStyle } = this.props
    return (
      <div style={containerStyle}>
        <Link to={'/'}>
          <Map containerWidth={containerStyle.width} />
        </Link>
      </div>
    )
  }
}

Popout.propTypes = {
  containerStyle: PropTypes.object
}
