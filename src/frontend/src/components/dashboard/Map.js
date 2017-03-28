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
    const image = new window.Image();
    image.src = this.props.floorPlan;
    image.onload = () => {
      this.setState({
        image: image
      });
    }
  }

  background() {
    return <Image
      width={700}
      height={500}
      image={this.state.image}
    />
  }

  tags() {
    return this.props.positions.map((tag, i) =>
      <Circle
        key={i}
        ref={`tag${i}`}
        radius={2}
        x={tag.x}
        y={tag.y}
        fill={`#${tag.iconColor}`}
      />
    )
  }

  anchors() {
    return this.props.anchors.map((anchor, i) =>
      <Rect
        key={i}
        ref={`rect${i}`}
        x={anchor.x}
        y={anchor.y}
        width={8}
        height={8}
        fill={`#000`}
      />
    )
  }

  render() {
      return (
        <Stage width={700} height={500}>
          <Layer
            scale={{x:1, y: 1}}>
              {this.state && this.state.image && this.background()}
              {this.tags()}
              {this.anchors()}
          </Layer>
        </Stage>
      )
  }
}

Map.propTypes = {
  positions: PropTypes.array,
  anchors: PropTypes.array,
  floorPlan: PropTypes.string
}

Map.defaultProps = {
  positions: [],
  anchors: []
}
