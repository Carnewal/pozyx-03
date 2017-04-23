import React, {PropTypes} from 'react'
import { Layer, Line, Circle, Rect } from 'react-konva'

export default class DrawLayer extends React.Component {

  state = {points:[], cur:{x:0,y:0}}

  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addingZone !== this.props.addingZone) {
      if (!nextProps.addingZone) {
        this.refs.drawLayer.off('mousemove click dblclick')
        this.setState({cur: {x:0,y:0}, prev: undefined, start: undefined, points:[]})
      }
    }
  }

  componentDidUpdate() {
    if (this.props.addingZone &&
      this.refs.drawLayer.eventListeners.mousemove === undefined) {
      const scaling = this.props.mapScaling
      this.refs.drawLayer.on('mousemove', () => {
        const pos = this.props.stage.getPointerPosition()
        this.setState({cur: pos})
      })
      this.refs.drawLayer.on('click', () => {
        const pos = this.props.stage.getPointerPosition()
        const points = this.state.points.slice()

        points.push(pos.x, pos.y)

        if (this.state.points.length === 0) {
          this.setState({start: pos})
        }

        this.setState({points, prev: pos})
      })
      this.refs.drawLayer.on('dblclick', () => {
        const length = this.state.points.length

        if (this.state.points[length - 1] === this.state.points[length - 3] && this.state.points[length - 2] === this.state.points[length - 4]) {
          if (this.state.points.length >= 10) {
            const points = this.state.points.slice()
            points.splice(points.length - 4)
            points.push(points[0], points[1])
            this.setState({points, prev: undefined})
            this.refs.drawLayer.off('mousemove click dblclick')

            //TODO: show dialog to choose name and color, going to use zone and green for the time being
            //TODO: the code below should be executed when closing the dialog

            const uploadPoints = []

            for (let i = 0; i < this.state.points.length; i+=2) {
              uploadPoints.push({x:points[i] / scaling, y:points[i+1] / scaling})
            }
            this.props.requestAddZone(this.props.mapId, 'zone', '#007713', uploadPoints)
          } else {
            const points = this.state.points.slice()
            points.splice(points.length - 2)
            this.setState({points})
            this.props.showPointsAlert()
          }
        }
      })
    }
  }

  render() {
    const { containerWidth, containerHeight } = this.props
    return (
      <Layer ref='drawLayer'>
        <Line x={0} y={0}
          points={this.state.points}
          stroke='red'
          strokeWidth={5}/>
        {this.state.prev !== undefined ?
          <Line x={0} y={0}
            points={[this.state.prev.x, this.state.prev.y, this.state.cur.x, this.state.cur.y]}
            stroke='red'
            strokeWidth={3}/>
          :
          <Line x={0} y={0}
            points={0,0}
            stroke='red'/>
        }
        {this.state.start !== undefined ?
          <Circle ref='endpoint' x={this.state.start.x} y={this.state.start.y}
            radius={3}
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

DrawLayer.propTypes = {
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
  mapScaling: PropTypes.number,
  addingZone: PropTypes.bool,
  stage: PropTypes.object,
  requestAddZone: PropTypes.func,
  showPointsAlert: PropTypes.func,
  mapId: PropTypes.number
}
