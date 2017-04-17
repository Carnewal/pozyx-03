
const initialState = [
  { mapId: 1, id: 1, name: 'Trigger nr1', enabled: true, tree: {type: 'logical', value: {
    logic: 'and',
    children: [
      {type:'tagInZone', value: {condition: 'any', tagIds: [3,4], zoneId: 6}},
      {type:'tagBattery', value: {condition: 'none', tagIds: [3,4], operator: '<', percentage: 0.5}},
      {type:'tagHWVersion', value: {condition: 'all', tagIds: [3,4], operator: '=', number: 15 }},
      {type:'tagAmountInZone', value: {operator: '>=', amount: 1, zoneId: 5}},
      {type:'labelInZone', value: {condition: 'all', labelIds: [7,8], zoneId: 6}},
      {type:'labelBattery', value: {condition: 'none', labelIds: [7,8], operator: '<', percentage: 0.5}},
      {type:'anchorStatus', value: {condition: 'any', anchorIds: [1,2], status: 'disabled'}},
      {type:'anchorFWVersion', value: {condition: 'all', anchorIds: [1,2], operator: '=', number: 15 }},
    ]
  }}},
  { mapId: 1, id: 2, name: 'Trigger nr2', enabled: false, tree: {type:'tagInZone', value: {
    condition: 'any',
    tagIds: [3,4],
    zoneId: 6
  }}},
]

const trigger = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state
  }
}

export default trigger
