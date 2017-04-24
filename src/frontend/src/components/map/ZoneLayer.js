import React, { PropTypes } from 'react'
import { Layer, Group, Line, Text } from 'react-konva'

export default class ZoneLayer extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    if (this.props.removing) {
      for (let i = 0; i < this.props.zones.length; i++) {
        const cross = this.refs['cross'+i]
        cross.setOffset({x: cross.getWidth() / 2, y: cross.getHeight() / 2})

        cross.on('click', () => {
          this.props.requestRemoveZone(cross.attrs.id)
        })
      }
    }
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
      {this.props.removing &&
        <Text x={zone.polygon[0]} y={zone.polygon[1]}
          text={'X'}
          id={zone.id}
          fontStyle={'bold'}
          fontSize={5}
          fill={'#000'}
          ref={'cross'+i}
        />
      }
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
  zones: PropTypes.array,
  removing: PropTypes.bool,
  requestRemoveZone: PropTypes.func
}
