import { connect } from 'react-redux'
import AnchorTable from 'frontend/components/anchor/Table'
import { getAnchors } from 'frontend/selectors/anchor'

const mapStateToProps = (state) => {
    return {
        anchors: getAnchors(state)
    }
}

export default connect(
    mapStateToProps,
)(AnchorTable)
