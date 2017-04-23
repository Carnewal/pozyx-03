import React, { PropTypes } from 'react'
import { Layer, Group, Line } from 'react-konva'

export default class ZoneLayer extends React.Component {

  constructor(props) {
    super(props)
  }

  zones(mapScaling) {
    return this.props.zones.map((zone, i) =>
    <Group key={i}>
      <Line x={0} y={0}
        key={'fill'+i}
        ref={`zone${i}`}
        points={zone.polygon}
        stroke={zone.color}
        scaleX={mapScaling}
        scaleY={mapScaling}
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
        scaleX={mapScaling}
        scaleY={mapScaling}
        strokeWidth={5/mapScaling}
        closed={true}
        />
      </Group>
    )
  }

  render() {
    const { mapScaling } = this.props
    return (
      <Layer>
        {this.zones(mapScaling)}
      </Layer>
    )
  }
}

ZoneLayer.propTypes = {
  mapScaling: PropTypes.number,
  zones: PropTypes.array
}
