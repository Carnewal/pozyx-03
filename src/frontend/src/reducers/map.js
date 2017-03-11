import { SET_FLOORPLAN } from '../actions/FloorPlanActions'

const initialState = {
  anchors: [

  ],
  tags: [
    {
      "tagId": 5,
      "tagName": "Maximus",
      "mapId": 4,
      "hardwareVersion": 12,
      "firmwareVersion": 11,
      "battery": 0.5,
      "updateRate": 1.2,
      "iconNumber": 1,
      "iconColor": "ee11ff",
      "position": {
        "x": 10,
        "y": 25,
        "z": 1,
        "timestamp": "2017-03-07T15:31:31.456+01:00"
      },
      "labels": [
        {
          "labelId": 1,
          "labelName": "Cart"
        },
        {
          "labelId": 2,
          "labelName": "Warehouse"
        }
      ]
    },
    {
      "tagId": 6,
      "tagName": "Arnold",
      "mapId": 4,
      "hardwareVersion": 12,
      "firmwareVersion": 11,
      "battery": 0.7,
      "updateRate": 1.2,
      "iconNumber": 1,
      "iconColor": "4286f4",
      "position": {
        "x": 20,
        "y": 2,
        "z": 11,
        "timestamp": "2017-03-07T15:31:31.456+01:00"
      },
      "labels": [
        {
          "labelId": 1,
          "labelName": "Cart"
        },
        {
          "labelId": 3,
          "labelName": "Storage Room"
        }
      ]
    }
  ],
  floorPlan: ''
}

export const types = {
  // SET_ANCHORS: 'SET_ANCHORS',

}

const map = (state = initialState, action) => {
  switch(action.type) {
    case SET_FLOORPLAN:
      //hier zal er naar de backend moeten worden gestuurd en de link worden ontvangen
      return {...state, floorPlan: action.file}
    default:
      return state
  }
}

export default map
