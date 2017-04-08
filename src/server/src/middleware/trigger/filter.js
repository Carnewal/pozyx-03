function name() {
  return true
}

function inZone() {
  return true
}

function outsideZone() {
  return true
}

function label() {
  return true
}

function battery() {
  return true
}

function hardwareVersion() {
  return true
}

function firmwareVersion() {
  return true
}

function status() {
  return true
}

const filter = {
  "name": name,
  "inZone": inZone,
  "outsideZone": outsideZone,
  "label": label,
  "battery": battery,
  "hardwareVersion": hardwareVersion,
  "firmwareVersion": firmwareVersion,
  "status": status
}

export default filter
