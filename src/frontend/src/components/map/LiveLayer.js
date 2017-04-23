import React, {PropTypes} from 'react'
import {Layer, Rect, Group, Circle, Text as KText} from 'react-konva'

const ANCHOR_SIZE = 3
const TAG_RADIUS = 1

export default class LiveLayer extends React.Component {

  constructor(props) {
    super(props)
  }

  tags() {
    return this.props.tags.map((tag, i) =>
      <Group
        key={i}
        x={tag.position.x}
        y={tag.position.y}
      >
        <KText
          text={tag.name}
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
        x={anchor.x - ANCHOR_SIZE / 2}
        y={anchor.y - ANCHOR_SIZE / 2}
        width={ANCHOR_SIZE}
        height={ANCHOR_SIZE}
        fill={`#fff`}
      />
    )
  }

  render() {
    const { mapScaling } = this.props
    return (
      <Layer scale={{x:mapScaling, y: mapScaling}}>
        {this.tags(mapScaling)}
        {this.anchors(mapScaling)}
      </Layer>
    )
  }

}

LiveLayer.propTypes = {
  tags: PropTypes.array,
  anchors: PropTypes.array,
  mapScaling: PropTypes.number
}

LiveLayer.defaultProps = {
  tags: [],
  anchors: []
}
