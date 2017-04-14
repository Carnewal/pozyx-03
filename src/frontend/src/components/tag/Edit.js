import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Chip from 'material-ui/Chip'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import Toggle from 'material-ui/Toggle'
import DatePicker from 'material-ui/DatePicker'
import {grey400} from 'material-ui/styles/colors'
import Divider from 'material-ui/Divider'
import PageBase from 'frontend/components/layout/PageBase'

const styles = {
  toggleDiv: {
    maxWidth: 300,
    marginTop: 40,
    marginBottom: 5
  },
  toggleLabel: {
    color: grey400,
    fontWeight: 100
  },
  buttons: {
    marginTop: 30,
    float: 'right'
  },
  saveButton: {
    marginLeft: 5
  },
  chip: {
    margin: 4,
  },
  chipWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}

export default class Edit extends React.Component {

  //TODO: Improve this
  // Currently, the labels are too deeply nested which makes the Component
  // Not update when the state changes.
  shouldComponentUpdate(a,b) {
    return true
  }

  onLabelRemoveToggle(e, checked) {
    this.setState({canRemoveLabels: checked})
  }

  onLabelTextFieldKeyDown(e) {
    if(e.key === 'Enter' &&
      this.refs.labelTextField &&
      this.refs.labelTextField.input &&
      this.refs.labelTextField.input.value &&
      this.refs.labelTextField.input.value !== ''
    ) {
      const {tag, currentMap} = this.props
      this.props.addLabel(
        currentMap.id,
        tag.id,
        this.refs.labelTextField.input.value
      )
      this.forceUpdate()
    }
  }

  onLabelRemoveClick(labelId) {
    const {currentMap, tag, removeLabel} = this.props
    removeLabel(currentMap.id, tag.id, labelId)
    this.forceUpdate()
  }

  render () {
    const {tag, currentMap} = this.props
    return tag && currentMap && (
      <PageBase title={`Edit tag ${tag.id}`}
      navigation='Application / Edit Tag'>




      <TextField
        hintText='Name'
        floatingLabelText='Name'
        fullWidth={true}
        value={tag.name}
        disabled
      />

      <TextField
        ref='labelTextField'
        hintText='Press enter to submit'
        floatingLabelText='Add a label'
        fullWidth={true}
        onKeyDown={(e) => this.onLabelTextFieldKeyDown(e)}
      />
      <div className='row'>
        <div className='col-xs-12 col-sm-9'>
          <div style={styles.chipWrapper}>
            {tag.labels && tag.labels.map((l) => <Chip
              style={styles.chip}
              onRequestDelete={this.state && this.state.canRemoveLabels
                ? () => {this.onLabelRemoveClick(l.id)}
                : null
              }
              key={l.id}
              >{l.name}</Chip>)}
          </div>
        </div>
        <div className='col-xs-12 col-sm-3'>
          <Toggle
          label='Label removal mode'
          labelStyle={styles.toggleLabel}
          onToggle={(e,c) => this.onLabelRemoveToggle(e,c)}
          />
        </div>

      </div>

      </PageBase>
    ) || <div>Loading..</div>
  }
}

Edit.propTypes = {
  tag: PropTypes.object,
  currentMap: PropTypes.object,
  addLabel: PropTypes.func,
  removeLabel: PropTypes.func
}

Edit.defaultProps = {
  addLabel: (mapId, tagId, labelName) => {
    console.log('Not implemented: add label ' + labelName)
  },
  removeLabel: (mapId, tagId, labelId) => {
    console.log('Not implemented: remove label ' + labelId)
  }
}
