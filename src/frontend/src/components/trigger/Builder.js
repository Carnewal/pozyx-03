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
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {List, ListItem} from 'material-ui/List'
import Toggle from 'material-ui/Toggle'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import ContentInbox from 'material-ui/svg-icons/content/inbox'
import ContentDrafts from 'material-ui/svg-icons/content/drafts'
import ContentSend from 'material-ui/svg-icons/content/send'
import Subheader from 'material-ui/Subheader'

const expectedValues = {
  logical: ['operator', 'children'],
  tagInZone: ['condition', 'tagIds', 'zoneId'],
  tagBattery: ['condition', 'tagIds', 'operator', 'percentage'],
  tagHWVersion: ['condition', 'tagIds', 'operator', 'number'],
  tagAmountInZone: ['amount', 'zoneId'],
  labelInZone: ['condition', 'labelIds', 'zoneId'],
  labelBattery: ['condition', 'labelIds', 'operator', 'percentage'],
  anchorStatus: ['condition', 'anchorIds', 'status'],
  anchorFWVersion: ['condition', 'anchorIds', 'operator', 'number'],
}

const buildListItemName = (tree) =>
  tree.type.charAt(0).toUpperCase() +
  tree.type.split(/(?=[A-Z])/).join(' ').slice(1)

export default class Builder extends React.Component {
  state = {
    //Steps
    loading: false,
    finished: false,
    stepIndex: 0,
    //Trigger-building
    triggerTree: { type: 'logical', value: {
      operator: 'and',
      children: [
        {type:'tagInZone', value: {condition: 'any', tagIds: [3,4], zoneId: 6}},
        {type:'tagBattery', value: {condition: 'none', tagIds: [3,4], operator: '<', percentage: 0.5}},
        {type:'tagHWVersion', value: {condition: 'all', tagIds: [3,4], operator: '=', number: 15 }},
        {type:'tagAmountInZone', value: {amount: 1, zoneId: 5}},
        {type:'labelInZone', value: {condition: 'all', labelIds: [7,8], zoneId: 4}},
        {type:'labelBattery', value: {condition: 'none', labelIds: [7,8], operator: '<', percentage: 0.5}},
        {type:'anchorStatus', value: {condition: 'any', anchorIds: [1,2], status: 'disabled'}},
        {type:'anchorFWVersion', value: {condition: 'all', anchorIds: [3,4], operator: '=', number: 15 }},
      ]
    }},
    selectedItem: null,
    triggerEnabled: true
  }

  builder() {
    const {selectedItem} = this.state
    return selectedItem
      ? <div>Building...</div>
      : <div>Select an item to start editing.</div>
  }

  buildList() {
    const {triggerTree} = this.state

    return <List>
      <Subheader>Trigger Items</Subheader>
      {triggerTree.type
        ? this.buildListItem(triggerTree, [0])
        : 'This trigger has no items yet, add one!'
      }
    </List>
  }

  buildListItem(tree, indexPath) {
    return <ListItem
      primaryText={buildListItemName(tree)}
      leftIcon={<ContentInbox />}
      initiallyOpen={true}
      primaryTogglesNestedList={true}
      onNestedListToggle={()=>{console.log('toggle', indexPath)}}
      nestedItems={tree.type === 'logical' &&
        tree.value &&
        tree.value.children &&
        tree.value.children.length &&
        tree.value.children.map((child, i) => this.buildListItem(child, [...indexPath, i])) }
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
          {this.builder()}
          {this.buildList()}
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
    const {finished, stepIndex} = this.state;
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
      navigation='Application / Trigger / Build'>
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
  zones: PropTypes.array
}

Builder.defaultProps = {
  anchors: [{ id: 1 }, { id: 2 }],
  tags: [{ id: 3 }, { id: 4 }],
  zones: [{ id: 5 }, { id: 6 }],
  labels: [{ id: 7 }, { id: 8 }]
}
