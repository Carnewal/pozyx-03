import React, {PropTypes} from 'react'
import {Layer, Rect, Stage, Group, Image, Circle, Text as KText} from 'react-konva'

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

const ANCHOR_SIZE = 3
const TAG_RADIUS = 1


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
    return this.state && this.state.image && <Image
      width={w}
      height={h}
      image={this.state.image}
    />
  }

  tags() {
    return this.props.tags.map((tag, i) =>
      <Group
        key={i}
        x={tag.position.x}
        y={tag.position.y}
      >
        <KText
          text={tag.tagName}
          fontSize={5}
          fill={`#${tag.iconColor}`}
        />
        <Circle
          key={i}
          ref={`tag${i}`}
          radius={TAG_RADIUS}
          fill={`#${tag.iconColor}`}
        />
      </Group>
    )
  }

  anchors() {
    return this.props.anchors.map((anchor, i) =>
      <Rect
        key={i}
        ref={`rect${i}`}
        x={anchor.position.x - ANCHOR_SIZE / 2}
        y={anchor.position.y - ANCHOR_SIZE / 2}
        width={ANCHOR_SIZE}
        height={ANCHOR_SIZE}
        fill={`#fff`}
      />
    )
  }

  render() {

      const {containerWidth, containerHeight, mapScaling} = this.props

      return (
        <Stage width={containerWidth} height={containerHeight}>
          <Layer scale={{x:1, y: 1}}>
              {this.background(containerWidth, containerHeight)}
          </Layer>
          <Layer scale={{x:mapScaling, y: mapScaling}}>
            {this.tags(mapScaling)}
            {this.anchors(mapScaling)}
          </Layer>
        </Stage>
      )
  }
}

Map.propTypes = {
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
  mapScaling: PropTypes.number,
  tags: PropTypes.array,
  anchors: PropTypes.array,
  floorPlan: PropTypes.string
}

Map.defaultProps = {
  tags: [],
  anchors: []
}
