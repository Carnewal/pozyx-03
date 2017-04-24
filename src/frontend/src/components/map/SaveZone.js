import React, {PropTypes} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { CompactPicker as ColorPicker } from 'react-color'

const style = {
  width: '100%'
}

export default class SaveZone extends React.Component{

  state = {
    name: '',
    color: '#000'
  }

  constructor(props){
    super(props)
  }

  handleChangeComplete = (color) => {
    this.setState({color: color.hex})
  }

  createZoneClick = () => {
    if( this.state.name == "" ){
      this.props.emptyNameError()
      return
    }
    this.props.createZone(this.state.name, this.state.color)
  }

  render(){
    const actions = [
      <FlatButton
        label='Cancel'
        primary={true}
        onTouchTap={() => {this.props.cancelSave()}}
      />,
      <FlatButton
        label='Create Zone'
        onTouchTap={this.createZoneClick}
        primary={true}
      />
    ]

    return(
      <Dialog
          title={`Save ${this.state.name == '' ? 'Zone' : this.state.name}`}
          actions={actions}
          modal={true}
          open={true}
        >

          <div className='row'>
            <div className='col-xs-12 col-sm-4'>
              <TextField
                hintText='Zone name'
                floatingLabelText='Name'
                id='zoneName'
                style={style}
                onChange={(event, newValue)=>{this.setState({name: newValue})}}
                />
            </div>
            <div className='col-xs-12 col-sm-8'>
              <div>Pick a color:</div>
              <ColorPicker
                onChangeComplete={this.handleChangeComplete}
                color={this.state.color}
              />
            </div>
          </div>
        </Dialog>
      )
  }
}

SaveZone.propTypes = {
  cancelSave: PropTypes.func,
  createZone: PropTypes.func,
  emptyNameError: PropTypes.func
}
