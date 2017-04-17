import State from './state'
import Model from '../../model'

class Notifier {
  state = new State()
  triggers = new Map()

  initState = (mapId) => { //TODO Anchor/zone implementation
    Model.Tag.findAll({
      where: {
        mapId: mapId
      },
      include: [{model: Model.Label, through: Model.TagLabel, as: 'labels'}]
    }).then((tags) => {
      tags.forEach((tag) => {
        this.state.updateTag(tag)
      })
    })
  }

  updateState = (changes) => {
    if (changes.tags) {
      changes.tags.forEach((tag) => {
        this.state.updateTag(tag)
      })
    }
    if (changes.zones) {
      changes.zones.forEach((zone) => {
        this.state.updateZone(zone)
      })
    }
    if (changes.anchors) {
      changes.anchors.forEach((anchor) => {
        this.state.updateAnchor(anchor)
      })
    }
    this.check()
  }

  initTriggers = (mapId) => {
    Model.Trigger.findAll({
      where: {
        mapId: mapId
      }
    }).then((triggers) => {
      triggers.forEach((trigger) => {
        trigger.triggered = false
        this.triggers.set(trigger.id, trigger)
      })
    })
  }

  addTrigger = (trigger) => {
    this.triggers.set(trigger.id, trigger)
  }

  deleteTrigger = (trigger) => {
    this.triggers.delete(trigger.id)
  }

  check = () => {
    for (const [id, trigger] of this.triggers) {
      if (!trigger.triggered && trigger.check(this.state)) {
        trigger.action()
        trigger.triggered = true
      } else if (trigger.triggered && !trigger.check(this.state)) {
        trigger.triggered = false
      }
    }
  }
}

export default Notifier
