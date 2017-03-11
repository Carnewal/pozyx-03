import React from 'react'
import Data from '../data'
import UploadPlanArea from './UploadPlanArea'

export default class DashboardPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
      {this.state.floorPlan == undefined ?
        <UploadPlanArea /> : <img src={this.state.floorPlan}/>}
    </div>
  )
  }
}
