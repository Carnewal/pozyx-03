import React, {PropTypes} from 'react'
import {Layer, Stage, Image} from 'react-konva'
import LiveLayer from 'frontend/containers/map/LiveLayerContainer'
import DrawLayer from 'frontend/containers/map/DrawLayerContainer'
import ZoneLayer from 'frontend/containers/map/ZoneLayerContainer'

function updateImage(props, component) {
  const image = new window.Image()
  image.src = props.floorPlan
  image.onload = () => {
    component.setState({
      image: image
    })
  }
}

export default class Map extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    updateImage(this.props, this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.floorPlan !== this.props.floorPlan) {
      updateImage(nextProps, this)
    }
  }

  background(w, h) {
    return this.state && this.state.image && <Image
      width={w}
      height={h}
      image={this.state.image}
    />
  }

  render() {

      const {containerWidth, containerHeight, addingZone} = this.props

      return (
        <Stage ref='stage' width={containerWidth} height={containerHeight}>
          <Layer scale={{x:1, y: 1}}>
              {this.background(containerWidth, containerHeight)}
          </Layer>
          {this.props.viewingZones && <ZoneLayer containerWidth={containerWidth}/>}
          {!addingZone ?
            <LiveLayer containerWidth={containerWidth}/>:
            <DrawLayer containerWidth={containerWidth} stage={this.refs.stage.getStage()}/>
          }
        </Stage>
      )
  }
}

Map.propTypes = {
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
  mapScaling: PropTypes.number,
  floorPlan: PropTypes.string,
  addingZone: PropTypes.bool,
  viewingZones: PropTypes.bool
}
