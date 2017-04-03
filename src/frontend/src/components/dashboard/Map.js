import React, {PropTypes} from 'react'
import TagIcon from 'material-ui/svg-icons/maps/my-location'
import AnchorIcon from 'material-ui/svg-icons/action/perm-scan-wifi'
import {Layer, Rect, Stage, Group, Image, Circle} from 'react-konva';

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
  componentDidMount() {
    const image = new window.Image()
    image.src = this.props.floorPlan
    image.onload = () => {
      this.setState({
        image: image
      })
    }
  }

  background(w, h) {
    return <Image
      width={w}
      height={h}
      image={this.state.image}
    />
  }

  tags(scale) {
    return this.props.positions.map((tag, i) =>
      <Circle
        key={i}
        ref={`tag${i}`}
        radius={2}
        x={tag.x * scale}
        y={tag.y * scale}
        fill={'#fff'/*`#${tag.iconColor}`*/}
      />
    )
  }

  anchors(scale) {
    return this.props.anchors.map((anchor, i) =>
      <Rect
        key={i}
        ref={`rect${i}`}
        x={anchor.x * scale}
        y={anchor.y * scale}
        width={8}
        height={8}
        fill={`#fff`}
      />
    )
  }

  render() {

      const {containerWidth, map} = this.props
      const mapScaling = containerWidth / map.x
      const containerHeight = map.y * mapScaling


      return (
        <Stage width={containerWidth} height={containerHeight}>
          <Layer
            scale={{x:1, y: 1}}>
              {this.state && this.state.image && this.background(containerWidth, containerHeight)}
              {this.tags(mapScaling)}
              {this.anchors(mapScaling)}
          </Layer>
        </Stage>
      )
  }
}

Map.propTypes = {
  map: PropTypes.object,
  containerWidth: PropTypes.number,
  positions: PropTypes.array,
  anchors: PropTypes.array,
  floorPlan: PropTypes.string
}

Map.defaultProps = {
  positions: [],
  anchors: []
}
