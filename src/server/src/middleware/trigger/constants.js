const c =  {
  active: true,
  amount: {
    any: "any",
    exactly: "exactly",
    atLeast: "atLeast",
    lessThan: "lessThan"
  },
  amountValue: 0,
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
  filterValue: 0,
  action: {
    print: "print"
  }
}

export default c
