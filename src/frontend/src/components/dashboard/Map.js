import React, {PropTypes} from 'react'
import {Layer, Rect, Stage, Group, Image, Circle, Line, Text as KText} from 'react-konva'
import LiveLayer from 'frontend/containers/map/LiveLayerContainer'
import DrawLayer from 'frontend/containers/map/DrawLayerContainer'

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

  state = {points:[], cur:{x:0,y:0}}

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
      const stage = this.refs.stage.getStage()
      const scaling = this.props.mapScaling
      this.refs.drawLayer.on('mousemove', () => {
        const pos = stage.getPointerPosition()
        this.setState({cur: pos})
      })
      this.refs.drawLayer.on('click', () => {
        const pos = stage.getPointerPosition()
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
            let points = this.state.points.slice()
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
            let points = this.state.points.slice()
            points.splice(points.length - 2)
            this.setState({points})
            this.props.showPointsAlert()
          }
        }
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

  zones(mapScaling) {
    return this.props.zones.map((zone, i) =>
      <Group>
      <Line x={0} y={0}
        key={i}
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

      const {containerWidth, containerHeight, mapScaling, addingZone} = this.props

      return (
        <Stage ref='stage' width={containerWidth} height={containerHeight}>
          <Layer scale={{x:1, y: 1}}>
              {this.background(containerWidth, containerHeight)}
          </Layer>
          <Layer>
          </Layer>
          {!addingZone ?
            <LiveLayer containerWidth={containerWidth}/>:
            <DrawLayer containerWidth={containerWidth}/>
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
  addingZone: PropTypes.bool
}
