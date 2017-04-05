import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import Map from 'frontend/containers/MapContainer'

export default class Popout extends React.Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { containerStyle } = this.props
    return (
      <div style={containerStyle}>
        <Map containerWidth={containerStyle.width} />
      </div>
    )
  }
}

Popout.propTypes = {
  containerStyle: PropTypes.object
}
