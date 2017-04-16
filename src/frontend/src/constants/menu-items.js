import React from 'react'
import Assessment from 'material-ui/svg-icons/action/assessment'
import TagIcon from 'material-ui/svg-icons/maps/my-location'
import AnchorIcon from 'material-ui/svg-icons/action/perm-scan-wifi'
import TriggerIcon from 'material-ui/svg-icons/action/compare-arrows'

const menuItems = [
    { text: 'Dashboard', icon: <Assessment />, link: '/dashboard' },
    { text: 'Tags', icon: <TagIcon />, link: '/tag' },
    { text: 'Anchors', icon: <AnchorIcon/>, link: '/anchor' },
    { text: 'Triggers', icon: <TriggerIcon/>, link: '/trigger' }
]
export default menuItems
