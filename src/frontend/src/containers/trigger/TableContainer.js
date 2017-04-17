import { connect } from 'react-redux'
import TriggerTable from 'frontend/components/trigger/Table'
import { getTriggers } from 'frontend/selectors/trigger'

const mapStateToProps = (state) => ({
  triggers: getTriggers(state)
})

export default connect(
    mapStateToProps,
)(TriggerTable)
