
const initialState = [
  {
    "anchorId": 5,
    "mapId": 4,
    "anchorName": "Maximus",
    "hardwareVersion": 12,
    "firmwareVersion": 11,
    "position": {
      "x": 2.0000021,
      "y": 95.12555,
      "z": 0.04
    },
    "status": 0,
    "timestamp": "2017-03-07T15:31:31.456+01:00"
  },
  {
    "anchorId": 4,
    "mapId": 4,
    "anchorName": "John",
    "hardwareVersion": 12,
    "firmwareVersion": 11,
    "position": {
      "x": 98.0000021,
      "y": 4.12555,
      "z": 0.03
    },
    "status": 0,
    "timestamp": "2017-03-07T15:31:31.456+01:00"
  },
    {
      "anchorId": 6,
      "mapId": 5,
      "anchorName": "Maximus",
      "hardwareVersion": 12,
      "firmwareVersion": 11,
      "position": {
        "x": 98.0000021,
        "y": 1.12555,
        "z": 0.04
      },
      "status": 0,
      "timestamp": "2017-03-07T15:31:31.456+01:00"
    },
    {
      "anchorId": 7,
      "mapId": 5,
      "anchorName": "John",
      "hardwareVersion": 12,
      "firmwareVersion": 11,
      "position": {
        "x": 13.0000021,
        "y": 91.12555,
        "z": 0.03
      },
      "status": 0,
      "timestamp": "2017-03-07T15:31:31.456+01:00"
    },

]

const anchor = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state
  }
}

export default anchor
