import React, { PropTypes } from 'react'
import { Layer, Group, Line, Text } from 'react-konva'

export default class ZoneLayer extends React.Component {

  constructor(props) {
    super(props)
  }

  zones(mapScaling) {
    return this.props.zones.map((zone, i) => <Group key={i}>
      <Line x={0} y={0}
        key={'fill'+i}
        ref={`zone${i}`}
        points={zone.polygon}
        stroke={zone.color}
        strokeWidth={5/mapScaling}
        closed={true}
        fill={`${zone.color}`}
        opacity={0.5}
      />
      <Line x={0} y={0}
        key={'border'+i}
        ref={`zone${i}`}
        points={zone.polygon}
        stroke={zone.color}
        strokeWidth={5/mapScaling}
        closed={true}
      />
      <Text x={zone.polygon[0]+1} y={zone.polygon[1]+1}
        text={zone.name}
        fill={'#000'}
        fontSize={5}
      />
      </Group>
    )
  }

  render() {
    const { mapScaling } = this.props
    return (
      <Layer scale={{x: mapScaling, y: mapScaling}}>
        {this.zones(mapScaling)}
      </Layer>
    )
  }
}

ZoneLayer.propTypes = {
  mapScaling: PropTypes.number,
  zones: PropTypes.array
}
