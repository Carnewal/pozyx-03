import React, { PropTypes } from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { grey500 } from 'material-ui/styles/colors'
import Chip from 'material-ui/Chip'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
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
        width: 118,
        marginTop: -14
    }
}

export default class AnchorTable extends React.Component {

    render() {
        const {
            anchors
        } = this.props

        return (
            <PageBase title='Anchors'
                navigation='Map / Anchor'>
                <br />


                {anchors.length > 0
                    ? <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columns.name}>Firmwareversion</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columns.name}>Hardwareversion</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {anchors.map(anchor =>
                            <TableRow key={anchor.id}>
                                <TableRowColumn style={styles.columns.id}>{anchor.id}</TableRowColumn>
                                <TableRowColumn style={styles.columns.name}>{anchor.name}</TableRowColumn>
                                <TableRowColumn style={styles.columns.price}>{anchor.firmwareVersion}</TableRowColumn>
                                <TableRowColumn style={styles.columns.price}>{anchor.hardwareVersion}</TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                    : <div><br />No anchors found!</div>}
            </PageBase>
        )

    }
}

AnchorTable.propTypes = {
    anchors: PropTypes.array
}

AnchorTable.defaultProps = {
    anchors: []
}
