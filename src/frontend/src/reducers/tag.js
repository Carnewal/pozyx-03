import { SHOW_POSITIONS } from 'frontend/actions/TagActions'

const initialState = [
  {
    "tagId": 5,
    "tagName": "Maximus",
    "mapId": 5,
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
    "tagId": 4,
    "tagName": "Minima",
    "mapId": 4,
    "hardwareVersion": 12,
    "firmwareVersion": 11,
    "battery": 0.15,
    "updateRate": 1.2,
    "iconNumber": 1,
    "iconColor": "e9841f",
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
        "labelId": 4,
        "labelName": "Jonasty"
      }
    ]
  },
  {
    "tagId": 6,
    "tagName": "Arnold",
    "mapId": 4,
    "hardwareVersion": 12,
    "firmwareVersion": 11,
    "battery": 0.30,
    "updateRate": 1.2,
    "iconNumber": 1,
    "iconColor": "baa4c5",
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
  },
  {
    "tagId": 7,
    "tagName": "Eva",
    "mapId": 4,
    "hardwareVersion": 12,
    "firmwareVersion": 11,
    "battery": 0.6,
    "updateRate": 1.2,
    "iconNumber": 1,
    "iconColor": "bdd05b",
    "position": {
      "x": 20,
      "y": 2,
      "z": 11,
      "timestamp": "2017-03-07T15:31:31.456+01:00"
    },
    "labels": [
      {
        "labelId": 4,
        "labelName": "Jonasty"
      },
      {
        "labelId": 8,
        "labelName": "Larder"
      }
    ]
  },
  {
    "tagId": 8,
    "tagName": "Eva2",
    "mapId": 4,
    "hardwareVersion": 12,
    "firmwareVersion": 11,
    "battery": 0.8,
    "updateRate": 1.2,
    "iconNumber": 1,
    "iconColor": "4286f4",
    "position": {
      "x": 20,
      "y": 2,
      "z": 11,
      "timestamp": "2017-03-07T15:31:31.456+01:00"
    }
  }
]

const tag = (state = initialState, action) => {
  switch(action.type) {
    case SHOW_POSITIONS:
      const newState = state.slice()
      const positions = action.positions
      newState.map((tag) => {
        if(positions[tag.tagId]) {
          delete positions[tag.tagId].tagId
          tag.position = positions[tag.tagId]
        }
      })
      return newState
    default:
      return state
  }
}

export default tag
