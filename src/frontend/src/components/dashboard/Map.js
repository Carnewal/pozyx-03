import React, {PropTypes} from 'react'
import TagIcon from 'material-ui/svg-icons/maps/my-location'
import AnchorIcon from 'material-ui/svg-icons/action/perm-scan-wifi'

const style = {
  wrappingDiv: {
    width: '75%',
    margin: 'auto',
    position: 'relative'
  },
  img: {
    width: '100%'
  },
  tag: {
    position: 'absolute',
    height: '10px',
    width: '10px',
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: '5px'
  },
  tagIcon: {
    height:'15px',
    width: '15px'
  },
  anchor: {
    position: 'absolute'
  }
}
export default class Map extends React.Component {

  constructor(props) {
    super(props)
  }

  tags() {
    return this.props.positions.map((tag, i) =>
      <div key={i} style={{...style.tag, left: tag.x + '%', top: tag.y + '%'}}>
        <TagIcon style={style.tagIcon}/>
      </div>
    )
  }

  anchors() {
    return this.props.anchors.map((anchor, i) =>
      <div key={i} style={{...style.anchor, left: anchor.x + '%', top: anchor.y + '%'}}>
        <AnchorIcon/>
      </div>
    )
  }

  render() {
      return (<div style={style.wrappingDiv}>
        {this.tags()}
        {this.anchors()}
        <img style={style.img} src={this.props.floorPlan} />
      </div>)
  }
}

Map.propTypes = {
  positions: PropTypes.array
}

Map.defaultProps = {
  positions: []
}
