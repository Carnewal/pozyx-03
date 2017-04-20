import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/Flatbutton'
import TextField from 'material-ui/TextField'
import ColorPicker from 'material-ui-color-picker'

export default class SaveZone extends React.Component{

  state = {
    name: '',
    color: '#000'
  }

  constructor(props){
    super(props)
  }

  render(){
    const actions = [
      <FlatButton
        label='Cancel'
        primary={true}
      />,
      <FlatButton
        label='Create Zone'
        primary={true}
      />

    ]

    return(
      <div>
        <Dialog
          title={`Save ${this.state.name == '' ? 'Zone' : this.state.name}`}

          actions={actions}
          modal={true}
          open={true}
        >
          <TextField
            hintText='Zone name'
            floatingLabelText='Name'
            onChange={(event, newValue)=>{this.setState({name: newValue})}}
          />

          <ColorPicker
            defaultValue={this.state.color}
            onChange={(color)=>{this.setState({color})}}
          />

        </Dialog>
      </div>)
  }
}
