import React, { PropTypes } from 'react'
import Map from 'frontend/containers/MapContainer'

export default class Popout extends React.Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { containerStyle } = this.props
    return (
      <div style={containerStyle}>
        <Map containerWidth={400} />
      </div>
    )
  }
}

Popout.propTypes = {
  containerStyle: PropTypes.object
}
