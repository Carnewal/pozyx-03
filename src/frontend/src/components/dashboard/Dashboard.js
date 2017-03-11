import React from 'react'
import UploadPlanArea from '../../containers/UploadPlanArea'

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
      {this.props.floorPlan == '' ? <UploadPlanArea/> : <img src={this.props.floorPlan} />}
      </div>
    )
  }
}
