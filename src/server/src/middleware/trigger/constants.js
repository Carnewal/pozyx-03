const c =  {
  value: 0,
  amount: {
    any: "any",
    exactly: "exactly",
    atLeast: "atLeast",
    lessThan: "lessThan"
  },
  objects: {
    tags: "tags",
    anchors: "anchors"
  },
  filter: {
    name: "name",
    inZone: "inZone",
    outsideZone: "outsideZone",
    label: "label", //tag only,
    battery: "battery", //tag only
    hardwareVersion: "hardwareVersion",
    firmwareVersion: "firmwareVersion",
    status: "status" //anchor only
  },
  action: {
    print: "print"
  }
}

export default c
