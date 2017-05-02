class Filter {

  reference

  constructor(reference) {
    this.reference = reference
  }

  name(tag) {
    return this.reference === tag.name
  }

  inZone(tag) {
    return true //TODO implement based on zone object properties
  }

  outsideZone(tag) {
    return !this.inZone(tag)
  }

  label(tag) {
    return tag.labels.filter((label) => (label.labelName === this.reference)).length > 0
  }

  battery(tag) {
    return tag.battery < this.reference
  }

  hardwareVersion(tag) {
    return tag.hardwareVersion === this.reference
  }

  firmwareVersion(tag) {
    return tag.firmwareVersion === this.reference
  }

  status(anchor) {
    return anchor.status === this.reference
  }

}

export default Filter
