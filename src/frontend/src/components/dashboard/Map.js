import React, {PropTypes} from 'react'

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
    backgroundColor: '#1e88e5',
    borderRadius: '5px'
  }
}
export default class Map extends React.Component {

  constructor(props) {
    super(props)
  }

  tags() {
    return this.props.positions.map((tag, i) =>
      <div key={i} style={{...style.tag, left: tag.x + '%', top: tag.y + '%'}}></div>
    )
  }

  render() {
      return (<div style={style.wrappingDiv}>
        {this.tags()}
        <img style={style.img} src={this.props.floorPlan} />
      </div>)
  }
}

Map.propTypes = {
  positions: PropTypes.array
}

Map.defaultProps = {
  positions: []
}
