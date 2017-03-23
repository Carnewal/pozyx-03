import React, {PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {grey500} from 'material-ui/styles/colors'
import Chip from 'material-ui/Chip'
import TextField from 'material-ui/TextField'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider'
import PageBase from 'frontend/components/layout/PageBase'

const styles = {
  floatingActionButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  editButton: {
    fill: grey500
  },
  columns: {
    id: {
      width: '10%'
    },
    name: {
      width: '40%'
    },
    price: {
      width: '20%'
    },
    category: {
      width: '20%'
    },
    edit: {
      width: '10%'
    }
  },
  chip: {
    margin: 4,
  },
  chipWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  slider: {
    marginTop: 22,
    marginBottom: 0
  },
  batteryDropdown: {
    width: 100
  }
}

export default class TagTable extends React.Component {

render() {
  const {
    labels,
    labelFilters,
    batteryFilter,
    batteryOperator,
    onLabelClick,
    onSearchChange,
    onBatteryOperatorChange,
    onBatteryFilterChange
  } = this.props

  return (
    <PageBase title='Tags'
    navigation='Map / Tags'>
      <br/>

      <div className='row'>
        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 '>
          <TextField
          hintText='Filter by id, name or label'
          onChange={(e,val) => { onSearchChange(val) }}
          />
        </div>
        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
          <div className='row'>
            <div className='col-xs-9 col-sm-10 col-md-8 col-lg-8 '>
              <Slider
                disabled={batteryOperator === 0}
                sliderStyle={styles.slider}
                defaultValue={1}
                value={batteryFilter}
                onChange={(e,val) => {onBatteryFilterChange(val)}}
              />
            </div>
            <div className='col-xs-3 col-sm-2 col-md-4 col-lg-4 '>
              <DropDownMenu
              value={batteryOperator}
              onChange={(e,i,val) => {onBatteryOperatorChange(val)}}
              >
                <MenuItem value={0} primaryText='Off' />
                <MenuItem value={1} label='>' primaryText='More than' />
                <MenuItem value={2} label='<' primaryText='Less than' />
              </DropDownMenu>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.chipWrapper}>
        {Object.keys(labels).map((lbl) =>
          <Chip
            style={styles.chip}
            key={lbl}
            onRequestDelete={labelFilters.includes(labels[lbl].labelId)
              ? () => { onLabelClick(labels[lbl].labelId) }
              : null
            }
            onTouchTap={() => {
              onLabelClick(labels[lbl].labelId)
            }}
            >
            {lbl}
          </Chip>
        )}
      </div>
      {this.props.tags.length > 0 ? <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
    <TableRow>
    <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
    <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
    <TableHeaderColumn style={styles.columns.price}>Labels</TableHeaderColumn>
    <TableHeaderColumn style={styles.columns.id}>Battery</TableHeaderColumn>
    </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
    {this.props.tags.map(tag =>
      <TableRow key={tag.tagId}>
        <TableRowColumn style={styles.columns.id}>{tag.tagId}</TableRowColumn>
        <TableRowColumn style={styles.columns.name}>{tag.tagName}</TableRowColumn>
        <TableRowColumn style={styles.columns.price}>
            <div style={styles.chipWrapper}>
              {tag.labels && tag.labels.map((l) => <Chip
                style={styles.chip}
                key={l.labelId}
                onRequestDelete={labelFilters.includes(l.labelId)
                  ? () => { this.props.onLabelClick(l.labelId) }
                  : null
                }
                onTouchTap={() => {
                  this.props.onLabelClick(l.labelId)
                }}
                >{l.labelName}</Chip>)}
            </div>
          </TableRowColumn>
        <TableRowColumn style={styles.columns.id}>{tag.battery * 100} %</TableRowColumn>
      </TableRow>
    )}
    </TableBody>
    </Table> : <div><br/>No tags found!</div>}
    </PageBase>
  )

}
}

TagTable.propTypes = {
  tags: PropTypes.array,
  labels: PropTypes.object,
  labelFilters: PropTypes.array,
  batteryFilter: PropTypes.number,
  batteryOperator: PropTypes.number,
  onLabelClick: PropTypes.func,
  onSearchChange: PropTypes.func,
  onBatteryFilterChange: PropTypes.func,
  onBatteryOperatorChange: PropTypes.func
}

TagTable.defaultProps = {
  tags: [],
  labels: {},
  labelFilters: [],
  batteryFilter: null,
  onLabelClick: (id) => {console.log('unhandled click ' + id)},
  onSearchChange: (val) => {console.log('unhandled search change ' + val)},
  onBatteryOperatorChange: (val) => {console.log('unhandled battery operator change ' + val)},
  onBatteryFilterChange: (val) => {console.log('unhandled battery slider change ' + val)}
}
