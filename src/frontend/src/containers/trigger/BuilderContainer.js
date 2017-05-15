import { connect } from 'react-redux'
import Builder from 'frontend/components/trigger/Builder'
import { getBuildingTrigger } from 'frontend/selectors/trigger'
import { getAnchors } from 'frontend/selectors/anchor'
import { getZones } from 'frontend/selectors/zone'
import { getTags,getExistingLabels } from 'frontend/selectors/tag'

const mapStateToProps = (state) => {
  const trigger = getBuildingTrigger(state)
  const labels = getExistingLabels(state)
  return {
    anchors:getAnchors(state),
    tags:getTags(state),
    zones:getZones(state),
    labels: Object.keys(labels).map((k) => labels[k]),
    triggerId: trigger && trigger.id,
    triggerFilters: trigger && trigger.filters,
    triggerActive: trigger && trigger.active,
    triggerComparator: trigger && trigger.comparator,
    triggerAction: trigger && trigger.action
  }
}

export default connect(
    mapStateToProps,
)(Builder)
