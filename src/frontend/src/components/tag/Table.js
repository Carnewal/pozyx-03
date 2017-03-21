import React, {PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {grey500} from 'material-ui/styles/colors'
import Chip from 'material-ui/Chip'
import TextField from 'material-ui/TextField'
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
  }
}

export default class TagTable extends React.Component {

render() {
  const {labels,labelFilters,onLabelClick,onSearchChange} = this.props

  return (
    <PageBase title='Tags'
    navigation='Map / Tags'>
      <br/>
      <TextField
        hintText="Search"
        onChange={(e,val) => { onSearchChange(val) }}
      />
      <br/>

      <div style={styles.chipWrapper}>
        {Object.keys(labels).map((lbl) =>
          <Chip
            style={styles.chip}
            key={lbl}
            onRequestDelete={labelFilters.includes(labels[lbl].labelId)
              ? () => { onLabelClick(labels[lbl].labelId) }
              : false
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
              {tag.labels.map((l) => <Chip
                style={styles.chip}
                key={l.labelId}
                onRequestDelete={labelFilters.includes(l.labelId)
                  ? () => { this.props.onLabelClick(l.labelId) }
                  : false
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
  onLabelClick: PropTypes.func,
  onSearchChange: PropTypes.func
}

TagTable.defaultProps = {
  tags: [],
  labels: {},
  labelFilters: [],
  onLabelClick: (id) => {console.log('unhandled click ' + id)},
  onSearchChange: (val) => {console.log('unhandled search change ' + val)}
}
