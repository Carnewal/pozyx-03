import React, {PropTypes} from 'react'
import { Layer } from 'react-konva'

export default class DrawLayer extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layer ref='drawLayer'>
        <Line x={0} y={0}
          points={this.state.points}
          stroke='red'
          scale={{x:1/mapScaling, y: 1/mapScaling}}
          strokeWidth={5}/>
        {this.state.prev !== undefined ?
          <Line x={0} y={0}
            points={[this.state.prev.x, this.state.prev.y, this.state.cur.x, this.state.cur.y]}
            stroke='red'
            scale={{x:1/mapScaling, y: 1/mapScaling}}
            strokeWidth={3}/>
          :
          <Line x={0} y={0}
            points={0,0}
            stroke='red'/>
        }
        {this.state.start !== undefined ?
          <Circle ref='endpoint' x={this.state.start.x/mapScaling} y={this.state.start.y/mapScaling}
            radius={3/mapScaling}
            fill='blue'
            stroke='blue'/>
          :
          <Circle x={0} y={0}
            radius={0}
            stroke='transparent'/>
        }
        <Rect
          x={0} y={0} width={containerWidth} height={containerHeight}
          fill='transparent'
          />
      </Layer>
    )
  }

}
