import React, {PropTypes} from 'react'

import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import PageBase from 'frontend/components/layout/PageBase'
import ExpandTransition from 'material-ui/internal/ExpandTransition'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {List, ListItem, makeSelectable} from 'material-ui/List'
import Toggle from 'material-ui/Toggle'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { grey500 } from 'material-ui/styles/colors'

import ContentAdd from 'material-ui/svg-icons/content/add'
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import LightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline'
import BatteryFull from 'material-ui/svg-icons/device/battery-full'
import MapIcon from 'material-ui/svg-icons/maps/map'
import TagIcon from 'material-ui/svg-icons/maps/my-location'
import AnchorIcon from 'material-ui/svg-icons/action/perm-scan-wifi'

const SelectableList = makeSelectable(List)


const expectedValues = {
  logical: ['logic', 'children'],
  tagInZone: ['condition', 'tagIds', 'zoneId'],
  tagBattery: ['condition', 'tagIds', 'operator', 'percentage'],
  tagHWVersion: ['condition', 'tagIds', 'operator', 'number'],
  tagAmountInZone: ['operator', 'amount', 'zoneId'],
  labelInZone: ['condition', 'labelIds', 'zoneId'],
  labelBattery: ['condition', 'labelIds', 'operator', 'percentage'],
  anchorStatus: ['condition', 'anchorIds', 'status'],
  anchorFWVersion: ['condition', 'anchorIds', 'operator', 'number'],
}

const buildListItemName = (tree) =>
  tree.type.charAt(0).toUpperCase() +
  tree.type.split(/(?=[A-Z])/).join(' ').slice(1)

const listIcons = {
  'logical': <LightbulbOutline />,
  'tagInZone': <TagIcon />,
  'tagBattery': <BatteryFull />,
  'labelBattery': <BatteryFull />,
  'tagAmountInZone': <i style={{verticalAlign:'text-bottom', fontWeight:'bold', marginLeft: '20px', marginTop:'16px', color: 'rgba(0, 0, 0, 0.870588)', fill: 'rgb(117, 117, 117)'}} >#</i>,
  'anchorStatus': <AnchorIcon />,
  'labelInZone': <MapIcon />
}
const getListIcon = (tree) => listIcons[tree.type] || <KeyboardArrowRight />

const traverseTree = (tree, path) => {
  path = path.slice()
  tree = Object.assign({}, tree)
  if(path && path.length) {
    path.forEach((p, i) => {
      if(tree.value.children && i != path.length - 1) {
        tree = tree.value.children[path[i+1]]
      }
    })
  }
  return tree
}

export default class Builder extends React.Component {
  state = {
    //Steps
    loading: false,
    finished: false,
    stepIndex: 0,
    //Trigger-building
    triggerTree: { type: 'logical', value: {
      logic: 'and',
      children: [
        {type:'tagInZone', value: {condition: 'any', tagIds: [3,4], zoneId: 6}},
        {type:'tagBattery', value: {condition: 'none', tagIds: [3,4], operator: '<', percentage: 0.5}},
        {type:'tagHWVersion', value: {condition: 'all', tagIds: [3,4], operator: '=', number: 15 }},
        {type:'tagAmountInZone', value: {operator: '>=', amount: 1, zoneId: 5}},
        {type:'labelInZone', value: {condition: 'all', labelIds: [7,8], zoneId: 6}},
        {type:'labelBattery', value: {condition: 'none', labelIds: [7,8], operator: '<', percentage: 0.5}},
        {type:'anchorStatus', value: {condition: 'any', anchorIds: [1,2], status: 'disabled'}},
        {type:'anchorFWVersion', value: {condition: 'all', anchorIds: [1,2], operator: '=', number: 15 }},
      ]
    }},
    selectedItemPath: [0,2],
    triggerEnabled: true
  }

  // Util
  getSelectedItem() {
    return traverseTree(this.state.triggerTree, this.state.selectedItemPath)
  }

  // Builder
  builder() {
    const {selectedItemPath} = this.state
    return selectedItemPath
      ? this.builderBlock(this.getSelectedItem())
      : <div>Select an item to start editing.</div>
  }

  builderBlock(item) {
      return <div>{expectedValues[item.type].map(
        (name) => this.builderComponent(name, item.value[name])
      )}</div>
  }

  builderComponent(name, value) {
    return this.bldrComponents[name] && this.bldrComponents[name](name, value) || <span>Not found: {name}</span>
  }

  // Tree Item Click Handlers
  handleAddChild(name) { // Name will most likely be children
    return () => {
      const item = this.getSelectedItem()
      if(item[name]) {
        item[name].push({})
      } else {
        item[name] = [{}]
      }
      this.setTreeValue(this.state.triggerTree, this.state.selectedItemPath, name, item[name])
    }
  }

  handleSelectChange(name) {
    return (event, index, value) => {
      this.setTreeValue(this.state.triggerTree, this.state.selectedItemPath, name, value)
    }
  }
  handleTextChange(name) {
    return (event, value) => {
      this.setTreeValue(this.state.triggerTree, this.state.selectedItemPath, name, value)
    }
  }
  //

  setTreeValue (triggerTree, indexPath, name, value) {
    this.setState({triggerTree: triggerTree, selectedItemPath: indexPath})
  }

  bldrComponents = {
    children: (name, value) => <RaisedButton label={`Add child (${value.length})`} primary onTouchTap={this.handleAddChild(name)} icon={<ContentAdd />}/>,
    condition: (name, value) => <SelectField floatingLabelText='Condition' value={value} onChange={this.handleSelectChange(name)}>
        <MenuItem value={'any'} primaryText='Any' />
        <MenuItem value={'all'} primaryText='All' />
        <MenuItem value={'none'} primaryText='None' />
      </SelectField>,
      operator: (name, value) => <SelectField floatingLabelText='Operator' value={value} onChange={this.handleSelectChange(name)}>
          <MenuItem key={1} value={'='} primaryText='Equal' />
          <MenuItem key={2} value={'!='} primaryText='Not Equal' />
          <MenuItem key={3} value={'>'} primaryText='More Than' />
          <MenuItem key={4} value={'>='} primaryText='More Than Or Equal' />
          <MenuItem key={5} value={'<'} primaryText='Less Than' />
          <MenuItem key={6} value={'<='} primaryText='Less Than Or Equal' />
        </SelectField>,
      logic: (name, value) => <SelectField floatingLabelText='Logic' value={value} onChange={this.handleSelectChange(name)}>
          <MenuItem key={1} value={'and'} primaryText='AND' />
          <MenuItem key={2} value={'or'} primaryText='OR' />
        </SelectField>,
      tagIds: (name, value) => <SelectField floatingLabelText='Select tags' multiple value={value} onChange={this.handleSelectChange(name)}>
          {this.props.tags.map((t, i) => <MenuItem key={i} value={t.id} primaryText={t.name} />)}
        </SelectField>,
      anchorIds: (name, value) => <SelectField floatingLabelText='Select anchors' multiple value={value} onChange={this.handleSelectChange(name)}>
          {this.props.anchors.map((t, i) => <MenuItem key={i} value={t.id} primaryText={t.name} />)}
        </SelectField>,
      labelIds: (name, value) => <SelectField floatingLabelText='Select labels' multiple value={value} onChange={this.handleSelectChange(name)}>
            {this.props.labels.map((l, i) => <MenuItem key={i} value={l.id} primaryText={l.name} />)}
          </SelectField>,
      zoneId: (name, value) => <SelectField floatingLabelText='Select a zone' value={value} onChange={this.handleSelectChange(name)}>
            {this.props.zones.map((z, i) => <MenuItem key={i} value={z.id} primaryText={z.name} />)}
          </SelectField>,
      status: (name, value) => <TextField floatingLabelText='Status' value={value} onChange={this.handleTextChange(name)} />,
      percentage: (name, value) => <TextField type='number' min={0} max={1} step={0.05} floatingLabelText='Percentage (0 to 1)' value={value} onChange={this.handleTextChange(name)} />,
      amount: (name, value) => <TextField type='number' min={0} step={1} floatingLabelText='Amount' value={value} onChange={this.handleTextChange(name)} />,
      number: (name, value) => <TextField value={value} floatingLabelText='Number' onChange={this.handleTextChange(name)} />
  }


  // List
  selectItemPath (indexPath) {
    this.setState({selectedItemPath: indexPath})
  }

  buildList() {
    const {triggerTree, selectedItemPath} = this.state
    return <div style={{ border: 'solid 1px #d9d9d9' }}>
      <SelectableList value={selectedItemPath.join(',')}>
        <Subheader>Trigger Items</Subheader>
        <Divider />
        {triggerTree.type
          ? this.buildListItem(triggerTree, [0])
          : 'This trigger has no items yet, add one!'
        }
      </SelectableList>
    </div>
  }

  buildListItem(tree, indexPath) {
    return <ListItem
      primaryText={buildListItemName(tree)}
      leftIcon={getListIcon(tree)}
      initiallyOpen={true}
      key={indexPath.join(',')}
      value={indexPath.join(',')}
      //primaryTogglesNestedList={true}
      onTouchTap={()=>{this.selectItemPath(indexPath)}}
      nestedItems={tree.type === 'logical' &&
        tree.value &&
        tree.value.children &&
        tree.value.children.length &&
        tree.value.children.map((child, i) => this.buildListItem(child, [...indexPath, i])) ||
        []
      }
      />
  }

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
          {this.buildList()} <br/>
          {this.builder()}
        </div>
      case 2:
        return (
          <p>
            Woot! You are almost ready to publish your newly created trigger. You have one more decision to make:
            <br />
            <br />

            <Toggle
              label='Enable your trigger?'
              labelPosition='right'
              toggled={this.state.triggerEnabled}
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
  zones: PropTypes.array
}

Builder.defaultProps = {
  anchors: [{ id: 1, name:'An' }, { id: 2, name: 'Chor' }],
  tags: [{ id: 3, name: 'Max' }, { id: 4, name: 'Eva' }],
  zones: [{ id: 5, name: 'Z5' }, { id: 6, name: 'Z6' }],
  labels: [{ id: 7, name:'Shop' }, { id: 8, name:'House' }]
}
