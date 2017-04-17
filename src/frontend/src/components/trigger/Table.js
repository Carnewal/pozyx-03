import React, { PropTypes } from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import {Link} from 'react-router'
import { grey500,pink500, grey200 } from 'material-ui/styles/colors'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import PageBase from 'frontend/components/layout/PageBase'
import Toggle from 'material-ui/Toggle'
import ContentCreate from 'material-ui/svg-icons/content/create'

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

export default class TriggerTable extends React.Component {

    render() {
        const {
            triggers
        } = this.props

        return (
            <PageBase title='Triggers'
                navigation='Map / Trigger'>
                <br />


                {triggers.length > 0
                    ? <Table selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columns.price}>Toggle</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columns.price}>Edit</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {triggers.map(trigger =>
                            <TableRow key={trigger.id}>
                                <TableRowColumn style={styles.columns.id}>{trigger.id}</TableRowColumn>
                                <TableRowColumn style={styles.columns.name}>{trigger.name}</TableRowColumn>
                                <TableRowColumn style={styles.columns.price}>
                                  <Toggle
                                    label='Toggled?'
                                    disabled={true}
                                    style={styles.toggle}
                                  />
                                </TableRowColumn>
                                <TableRowColumn style={styles.columns.price}>
                                  <Link className='button' to={`trigger/build`}>
                                    <FloatingActionButton zDepth={0}
                                                          mini={true}
                                                          backgroundColor={grey200}
                                                          iconStyle={styles.editButton}>
                                      <ContentCreate  />
                                    </FloatingActionButton>
                                  </Link>
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                    : <div><br />No triggers found! <br/>
                      Start building one by pressing the button at the bottom-right of your screen.</div>
                }

                      <Link to='/trigger/build' >
                         <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
                           <ContentAdd />
                         </FloatingActionButton>
                       </Link>
            </PageBase>
        )

    }
}

TriggerTable.propTypes = {
    triggers: PropTypes.array
}

TriggerTable.defaultProps = {
    triggers: [

    ]
}
