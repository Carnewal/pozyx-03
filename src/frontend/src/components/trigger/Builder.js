import React, {PropTypes} from 'react'
import { fromJS } from 'immutable'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import { grey500,pink500, grey200 } from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import PageBase from 'frontend/components/layout/PageBase'
import ExpandTransition from 'material-ui/internal/ExpandTransition'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar';

import {List, ListItem, makeSelectable} from 'material-ui/List'
import Toggle from 'material-ui/Toggle'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import ContentAdd from 'material-ui/svg-icons/content/add'

import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import LightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline'
import BatteryFull from 'material-ui/svg-icons/device/battery-full'
import WarningIcon from 'material-ui/svg-icons/alert/warning'
import MapIcon from 'material-ui/svg-icons/maps/map'
import TagIcon from 'material-ui/svg-icons/maps/my-location'
import AnchorIcon from 'material-ui/svg-icons/action/perm-scan-wifi'

const SelectableList = makeSelectable(List)

export default class Builder extends React.Component {

  constructor(props, c) {
    super(props, c)
    this.state = {
      //Steps
      loading: false,
      finished: false,
      stepIndex: 1,
      //Trigger-building
      triggerFilters: props.triggerFilters || [],
      triggerEnabled: true,
      editingFilter: -1
    }
  }

  FilterList() {
    return(
      <div style={{ border: 'solid 1px #d9d9d9' }}>
        <SelectableList>
          <Subheader>
            Trigger Filters
            <FlatButton
              label='Add Filter'
              labelPosition='after'
              secondary
              icon={<ContentAdd />}
              onTouchTap={this.addFilter}
            />
          </Subheader>
          <Divider />
          {this.state.triggerFilters && this.state.triggerFilters.length > 0 && this.state.triggerFilters.map((filter, i) => this.FilterListItem(filter, i)) || <div>Start adding filters by pressing the button above.</div>}
        </SelectableList>
      </div>
    )
  }

  filterTypes = {
    inZone: {
      icon: <MapIcon />,
      description: 'Inside Zone',
      text: (value) => `Inside zone ${this.props.zones.find((z) => z.id === value).name}`,
      editComponent: (i) =>
        <SelectField floatingLabelText='Select a zone' value={this.state.triggerFilters[i].value} onChange={(e, j, val) => {this.editFilterValue(i, val)}}>
          {this.props.zones.map((z, j) => <MenuItem key={j} value={z.id} primaryText={z.name} />)}
        </SelectField>
    },
    outZone: {
      icon: <MapIcon />,
      description: 'Outside Zone',
      text: (value) => `Outside zone ${this.props.zones.find((z) => z.id === value).name}`,
      editComponent: (i) =>
        <SelectField floatingLabelText='Select a zone' value={this.state.triggerFilters[i].value} onChange={(e, j, val) => {this.editFilterValue(i, val)}}>
          {this.props.zones.map((z, j) => <MenuItem key={j} value={z.id} primaryText={z.name} />)}
        </SelectField>
    },
    labels: {
      icon: <KeyboardArrowRight />,
      description: 'With Labels',
      text: (value) => `With any of labels: ${value.map((v) => this.props.labels.find((l) => l.id === v).name).join(', ')}`,
      editComponent: (i) =>
        <SelectField multiple floatingLabelText='Select labels' value={this.state.triggerFilters[i].value} onChange={(e, j, val) => {this.editFilterValue(i, val)}}>
          {this.props.labels.map((z, j) => <MenuItem key={j} value={z.id} primaryText={z.name} />)}
        </SelectField>
    },
    battery: {
      icon: <BatteryFull />,
      description: 'With Battery percentage',
      text: (value) => `With a battery between ${Math.round(value[0] * 100)} and ${Math.round(value[1]*100)}%`
    },
    name: {
      icon: <KeyboardArrowRight />,
      description: 'With Name containing',
      text: (value) => `With a name containing "${value}"`,
      editComponent: (i) =>
      <TextField
        value={this.state.triggerFilters[i].value}
        onChange={(e) => {this.editFilterValue(i, e.target.value)}}
      />

    },
  }

  TypeSelect() {
    return  <SelectField
      floatingLabelText='Select type'
      value={this.state.triggerFilters[this.state.editingFilter].type}
      onChange={this.setEditFilterType}
      autoWidth={true}
    >
      {Object.keys(this.filterTypes).map(
        (ft) => <MenuItem value={ft} primaryText={this.filterTypes[ft].description} />
      )}
    </SelectField>
  }

  FilterListItem(filter, i) {
    const filterType = this.filterTypes[filter.type]
    const editing = (i === this.state.editingFilter)

    if(filterType && editing) {
      return <ListItem leftIcon={<KeyboardArrowRight />} key={i} value={i} >
        {this.TypeSelect()}
        <br/>
        {this.filterTypes[filter.type].editComponent && this.filterTypes[filter.type].editComponent(i)}
        <br/>
        <FlatButton label='Ok' primary={true} onTouchTap={() => {this.setEditFilter(-1)}}/>
      </ListItem>
    } else if(!filterType && editing) {
      return <ListItem leftIcon={<KeyboardArrowRight />} value={i} key={i} >
        {this.TypeSelect()}
      </ListItem>
    } else if(filterType && !editing) {
      return <ListItem
        primaryText={filter.value && filterType.text(filter.value) || `${filterType.description} (empty)` }
        leftIcon={filterType.icon || <WarningIcon />}
        key={i}
        value={i}
        onTouchTap={()=>{this.setEditFilter(i)}}
      />
    } else {
      return <ListItem
        primaryText={'Empty filter'}
        leftIcon={<WarningIcon />}
        key={i}
        value={i}
        onTouchTap={()=>{this.setEditFilter(i)}}
      />
    }
  }

  EditItem(i) {
    if(i < 0 || !this.state.triggerFilters[i]) {
      return <div>No item selected</div>
    } else {
      const filter = this.state.triggerFilters[i]
      return <div>
        <SelectField
          floatingLabelText='Select type'
          value={this.state.triggerFilters[this.state.editingFilter].type}
          onChange={this.setEditFilterType}
          autoWidth={true}
          >
          {Object.keys(this.filterTypes).map(
            (ft) => <MenuItem value={ft} primaryText={this.filterTypes[ft].description} />
          )}
        </SelectField>
        {filter.type && this.filterTypes[filter.type].editComponent && this.filterTypes[filter.type].editComponent(i)}

      </div>
    }
  }




  editFilterValue = (i, value) => {
    const ns = [...this.state.triggerFilters]
    ns[i] = Object.assign({}, ns[i], { value: value })
    this.setState({ triggerFilters: ns })
  }

  setEditFilter = (index) => {
    this.setState({editingFilter: index})
  }

  setEditFilterType = (e, i, type) => {
    const ns = [...this.state.triggerFilters]
    ns[this.state.editingFilter] = { type: type }
    this.setState({ triggerFilters: ns })
  }

  addFilter = () => {
    this.setState(
      {
        triggerFilters: [...this.state.triggerFilters, {}],
        editingFilter: this.state.triggerFilters.length
      }
    )
  }

  publishTrigger = () => {

  }

  toggleTriggerEnabled() {
    return () => {
      this.setState({triggerEnabled: !this.state.triggerEnabled})
    }
  }

  // Page


  dummyAsync = (cb) => {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500)
    })
  };

  handleNext = () => {
    const {stepIndex} = this.state
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      }))
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }))
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <p>
            Building a new trigger is easy! <br/>
            Press the button to start the process, and we will guide you through it.
          </p>
        )
      case 1:
        return <div>
          <p>Now we build a chain of filters to apply to the tags on this map.</p>
          {this.FilterList()}<br/>
        </div>
      case 2:
        return (
          <p>
            Woot! You are almost ready to publish your newly created trigger. You have two more decisions to make:
            <br />
            <TextField floatingLabelText='Trigger name' ref='triggerName' />
            <br />
            <br />
            <Toggle
              label='Enable your trigger?'
              labelPosition='right'
              toggled={this.state.triggerEnabled}
              onToggle={this.toggleTriggerEnabled()}
            />
          </p>
        )
      default:
        return 'You\'re a long way from home sonny jim!'
    }
  }


  renderContent() {
    const {finished, stepIndex} = this.state
    const contentStyle = {margin: '0 16px', overflow: 'hidden'}

    if (finished) {
      return (
        <div style={contentStyle}>
          <p>
            <a
              href='#'
              onClick={(event) => {
                event.preventDefault()
                this.setState({stepIndex: 0, finished: false})
              }}
            >
              Click here
            </a> to build another trigger.
          </p>
          <p></p>
        </div>
      )
    }

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label='Back'
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label={stepIndex === 2 ? 'Finish' : 'Next'}
            primary={true}
            onTouchTap={this.handleNext}
          />
        </div>
      </div>
    )
  }

  render() {
    const {loading, stepIndex} = this.state

    return (
      <PageBase title='Build a trigger'
      navigation='Map / Trigger / Build'>
        <div style={{width: '100%', maxWidth: 1000, margin: 'auto'}}>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Create</StepLabel>
            </Step>
            <Step>
              <StepLabel>Build</StepLabel>
            </Step>
            <Step>
              <StepLabel>Publish</StepLabel>
            </Step>
          </Stepper>
          <ExpandTransition loading={loading} open={true}>
            {this.renderContent()}
          </ExpandTransition>
        </div>
      </PageBase>
    )
  }
}

Builder.propTypes = {
  anchors: PropTypes.array,
  tags: PropTypes.array,
  labels: PropTypes.array,
  zones: PropTypes.array,
  triggerId: PropTypes.number,
  triggerFilters: PropTypes.array,
  triggerEnabled: PropTypes.bool,
  createTrigger: PropTypes.func,
  publishTrigger: PropTypes.func,
  addFilter: PropTypes.func,
  removeFilter: PropTypes.func,
}

Builder.defaultProps = {
  anchors: [{ id: 1, name:'An' }, { id: 2, name: 'Chor' }],
  tags: [{ id: 3, name: 'Max' }, { id: 4, name: 'Eva' }],
  zones: [{ id: 5, name: 'Z5' }, { id: 6, name: 'Z6' }],
  labels: [{ id: 7, name:'Shop' }, { id: 8, name:'House' }],
  /*triggerFilters:[
      {
        type: "inZone",
        value: 2
      },
      {
        type: "outZone",
        value: 2
      },
      {
        type: "battery",
        value: [0, 0.2]
      },
      {
        type: "labels",
        value: ['warehouse', 'shop', 'store']
      },
      {
        type: "name",
        value: "name contains string"
      },
      {
        type: "hardwareVersion",
        value: ["1.2.3", "1.2.5"]
      },
      {
        type: "firmwareVersion",
        value: ["1.2.3", "1.2.5"]
      }
  ],*/
  createTrigger: () => {},
  publishTrigger: () => {}
}
