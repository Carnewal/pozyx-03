
const initialState = [
    {
      type: "inZone",
      value: 2
    },
    {
      type: "outZone",
      value: 2
    },
    {
      type: "battery",
      value: [0, 0.2]
    },
    {
      type: "labels",
      value: [0, 1, 2]
    },
    {
      type: "name",
      value: "name contains string"
    },
    {
      type: "hardwareVersion",
      value: ["1.2.3", "1.2.5"]
    },
    {
      type: "firmwareVersion",
      value: ["1.2.3", "1.2.5"]
    }
]

const trigger = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state
  }
}

export default trigger
