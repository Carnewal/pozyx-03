class State {
  tags = new Map()
  zones = new Map()
  anchors = new Map() // UNUSED

  updateTag(tag) {
    this.tags.set(tag.id, tag)
  }

  updateZone(zone) {
    this.zones.set(zone.id, zone)
  }

  updateAnchor(anchor) {
    this.anchors.set(anchor.id, anchor)
  }
}

export default State
