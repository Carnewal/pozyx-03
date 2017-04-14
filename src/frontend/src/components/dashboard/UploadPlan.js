import React from 'react'
import Dropzone from 'react-dropzone'

const styles = {
  width: '50%',
  margin: 'auto',
  height: 100,
  borderWidth: 2,
  borderColor: '#666',
  borderStyle: 'dashed',
  borderRadius: 5
}

export default class UploadPlan extends React.Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const {map, UploadFloorplan} = this.props
    return (
      <div>
      {map ?
      <Dropzone
        multiple={false}
        accept='image/png'
        style={styles}
        onDrop={(e) => UploadFloorplan(e[0])}>
        <p>Sleep een plattegrond naar hier of klik om een bestand up te loaden.
          <br/>Zorg ervoor dat de afmetingen van uw afbeelding een veelvoud zijn van de afmetingen van de kaart ({`${map.x} x ${map.y}`}).</p>
      </Dropzone>
      : null}
      </div>
    )
  }
}
