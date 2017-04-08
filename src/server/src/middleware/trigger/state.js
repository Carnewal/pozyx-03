class State {
  tags = new Map()
  zones = new Map()
  anchors = new Map()

  updateTag(tag) {
    this.tags.set(tag.id, tag)
  }

  updateZone(zone) {
    this.tags.set(zone.id, zone)
  }

  updateAnchor(anchor) {
    this.tags.set(anchor.id, anchor)
  }
}

export default State
