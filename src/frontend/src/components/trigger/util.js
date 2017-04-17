import React from 'react'

import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import LightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline'
import BatteryFull from 'material-ui/svg-icons/device/battery-full'
import WarningIcon from 'material-ui/svg-icons/alert/warning'
import MapIcon from 'material-ui/svg-icons/maps/map'
import TagIcon from 'material-ui/svg-icons/maps/my-location'
import AnchorIcon from 'material-ui/svg-icons/action/perm-scan-wifi'

export const expectedValues = {
  logical: ['logic', 'children'],
  tagInZone: ['condition', 'tagIds', 'zoneId'],
  tagBattery: ['condition', 'tagIds', 'operator', 'percentage'],
  tagHWVersion: ['condition', 'tagIds', 'operator', 'number'],
  tagAmountInZone: ['operator', 'amount', 'zoneId'],
  labelInZone: ['condition', 'labelIds', 'zoneId'],
  labelBattery: ['condition', 'labelIds', 'operator', 'percentage'],
  anchorStatus: ['condition', 'anchorIds', 'status'],
  anchorFWVersion: ['condition', 'anchorIds', 'operator', 'number'],
}

export const typeLabels = {
  logical: 'Logical Gate',
  tagInZone: 'Tags in Zone',
  tagBattery: 'Tag Battery %',
  tagHWVersion: 'Tag HW Version',
  tagAmountInZone: 'Amount of Tags in Zone',
  labelInZone: 'Labels in zone',
  labelBattery: 'Label Battery %',
  anchorStatus: 'Anchor Status',
  anchorFWVersion: 'Anchor FW Version',
}

const upperCaseFirst = (text) => text.charAt(0).toUpperCase() + text.split(/(?=[A-Z])/).join(' ').slice(1)

const buildListItemName = (tree) => {
  switch(tree.type) {
    case 'logical':
      return `Logical Gate (${tree.value.logic.toUpperCase()})`
    case 'tagInZone':
      return `${upperCaseFirst(tree.value.condition)} of Tags [${tree.value.tagIds.toString()}] should be in Zone ${tree.value.zoneId}`
    case 'tagBattery':
      return `${upperCaseFirst(tree.value.condition)} of Tags [${tree.value.tagIds.toString()}] should have a battery ${tree.value.operator} ${Math.round(tree.value.percentage * 100)}%`
    case 'tagAmountInZone':
      return `Amount of tags in Zone ${tree.value.zoneId} should be ${tree.value.operator} ${tree.value.amount}`
    case 'labelInZone':
      return `Tags with labels [${tree.value.labelIds}] should be in Zone ${tree.value.zoneId}`
    case 'labelBattery':
      return `Tags with labels [${tree.value.labelIds}] should have a battery ${tree.value.operator} ${Math.round(tree.value.percentage * 100)}%`
    case 'anchorStatus':
      return `${upperCaseFirst(tree.value.condition)} of Anchors [${tree.value.anchorIds}] should have a status: ${tree.value.status}`


    default:
      return typeLabels[tree.type] ||
        tree.type.charAt(0).toUpperCase() +
          tree.type.split(/(?=[A-Z])/).join(' ').slice(1)
  }
}

const listIcons = {
  'logical': <LightbulbOutline />,
  'tagInZone': <TagIcon />,
  'tagBattery': <BatteryFull />,
  'labelBattery': <BatteryFull />,
  'tagAmountInZone': <i style={{verticalAlign:'text-bottom', fontWeight:'bold', marginLeft: '20px', marginTop:'16px', color: 'rgba(0, 0, 0, 0.870588)', fill: 'rgb(117, 117, 117)'}} >#</i>,
  'anchorStatus': <AnchorIcon />,
  'labelInZone': <MapIcon />
}

const getListIcon = (tree) => listIcons[tree.type] || <KeyboardArrowRight />

/**
* Checks if all expectedValues are present in an item's values field
*/
const checkItemValues = (item) => expectedValues[item.type] && expectedValues[item.type].map((exp) => Object.keys(item.value).find((key) => key === exp))

export const buildListItemEntry = (item) => {
  const valuesCheck = checkItemValues(item)
  if(valuesCheck && valuesCheck.every((v) => v)) { // We have a complete entry
    return {
      text: buildListItemName(item),
      icon: getListIcon(item)
    }
  } else { // Not a complete entry
    return {
      text: item.type ? (typeLabels[item.type] || item.type) + ' (Missing ' + valuesCheck.join(",") + ')' : '(Missing type)',
      icon: <WarningIcon />
    }
  }
}
