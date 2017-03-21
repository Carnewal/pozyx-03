import React, {PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {grey500} from 'material-ui/styles/colors'
import Chip from 'material-ui/Chip'
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
  const {labels,labelFilters} = this.props

  return (
    <PageBase title='Tags'
    navigation='Map / Tags'>
      <span>Filter by Label:</span>
      <div style={styles.chipWrapper}>
        {Object.keys(labels).map((lbl) =>
          <Chip
            style={styles.chip}
            key={lbl}
            onRequestDelete={labelFilters.includes(labels[lbl].labelId)
              ? () => { this.props.onLabelClick(labels[lbl].labelId) }
              : false
            }
            onTouchTap={() => {
              this.props.onLabelClick(labels[lbl].labelId)
            }}
            >
            {lbl}
          </Chip>
        )}
      </div>

      <Table>
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
              {tag.labels.map((l) => <Chip style={styles.chip} key={l.labelId}>{l.labelName}</Chip>)}
            </div>
          </TableRowColumn>
        <TableRowColumn style={styles.columns.id}>{tag.battery * 100} %</TableRowColumn>
      </TableRow>
    )}
    </TableBody>
    </Table>
    </PageBase>
  )

}
}

TagTable.propTypes = {
  tags: PropTypes.array,
  labels: PropTypes.object,
  labelFilters: PropTypes.func,
  onLabelClick: PropTypes.func
}

TagTable.defaultProps = {
  tags: [],
  labels: {},
  labelFilters: [],
  onLabelClick: (id) => {console.log('click ' + id)}
}
