import React from 'react'
import UploadPlanArea from '../../containers/UploadPlanArea'
import Map from '../../containers/MapContainer'

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
      {this.props.floorPlan == '' ? <UploadPlanArea/> : <Map />}
      </div>
    )
  }
}
