import React, {PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {grey500} from 'material-ui/styles/colors'
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
  }
}

export default class TagTable extends React.Component {

render() {
  return (
    <PageBase title='Tags'
    navigation='Map / Tags'>
    <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
    <TableRow>
    <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
    <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
    </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
    {this.props.tags.map(tag =>
      <TableRow key={tag.tagId}>
      <TableRowColumn style={styles.columns.id}>{tag.tagId}</TableRowColumn>
      <TableRowColumn style={styles.columns.name}>{tag.tagName}</TableRowColumn>
      </TableRow>
    )}
    </TableBody>
    </Table>
    </PageBase>
  )

}
}

TagTable.propTypes = {
  tags: PropTypes.array
}

TagTable.defaultProps = {
  tags: []
}
