import React, {PropTypes} from 'react'
import UploadPlanArea from '../../containers/UploadPlanArea'
import Map from '../../containers/MapContainer'
import InfoBox from 'frontend/components/dashboard/InfoBox';
import RecentlyProducts from 'frontend/components/dashboard/RecentlyProducts';

import {cyan600, pink600, purple600, orange600} from 'material-ui/styles/colors';

import TagIcon from 'material-ui/svg-icons/maps/my-location';
import AnchorIcon from 'material-ui/svg-icons/action/perm-scan-wifi';

import globalStyles from 'frontend/styles';


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const {currentMap, floorPlan, tagsAmount, anchorsAmount} = this.props
    return (
      <div>
      <h3 style={globalStyles.navigation}>Application / Dashboard</h3>
      <h1>Map {currentMap}</h1>
      <div className="row">


        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox Icon={TagIcon}
                   color={purple600}
                   title="Tags"
                   value={tagsAmount}
          />
        </div>


        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox Icon={AnchorIcon}
                   color={cyan600}
                   title="Anchors"
                   value={anchorsAmount}
          />
        </div>

      </div>


      <br/>

      <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-15 ">
        {floorPlan == '' ? <UploadPlanArea/> : <Map />}

      </div>

      </div>
    </div>



    )
  }
}

Dashboard.propTypes = {
  tagsAmount: PropTypes.number,
  anchorsAmount: PropTypes.number,
  currentMap: PropTypes.number,
  floorPlan: PropTypes.string
}
