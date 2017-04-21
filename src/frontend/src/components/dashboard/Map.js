import React, {PropTypes} from 'react'
import {Layer, Rect, Stage, Group, Image, Circle, Line, Text as KText} from 'react-konva'

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
            this.props.requestAddZone(this.props.mapId, 'zone', 'green', uploadPoints)
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

  zones(mapScaling) {
    return this.props.zones.map((zone, i) =>
      <Line x={0} y={0}
        key={i}
        ref={`zone${i}`}
        points={zone.polygon}
        stroke={zone.color}
        scaleX={mapScaling}
        scaleY={mapScaling}
        strokeWidth={5/mapScaling}
        />
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
            {this.zones(mapScaling)}
          </Layer>
          {!addingZone ?
            <Layer scale={{x:mapScaling, y: mapScaling}}>
              {this.tags(mapScaling)}
              {this.anchors(mapScaling)}
            </Layer>:
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
          }
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
  floorPlan: PropTypes.string,
  addingZone: PropTypes.bool
}

Map.defaultProps = {
  tags: [],
  anchors: []
}
