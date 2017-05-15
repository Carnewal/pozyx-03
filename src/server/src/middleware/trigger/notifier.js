import State from './state'
import Model from '../../model'
import Factory from './factory'

class Notifier {

  factory
  state
  triggers
  primus

  constructor(primus) {
    this.factory = new Factory()
    this.state = new State()
    this.triggers = new Map()
    this.primus = primus
  }

  initState = (mapId) => {
    Model.Tag.findAll({
      where: {
        mapId: mapId
      },
      include: [{model: Model.Label, through: Model.TagLabel, as: 'labels'}]
    }).then((tags) => {
      tags.forEach((tag) => {
        this.state.updateTag(tag)
      })
    }).then(() => {
      Model.Zone.findAll({
        where: {
          mapId: mapId
        }
      }).then((zones) => {
        zones.forEach((zone) => {
          this.state.updateZone(zone)
        })
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
    /*if (changes.anchors) {
      changes.anchors.forEach((anchor) => {
        this.state.updateAnchor(anchor)
      })
    }*/
    this.check()
  }

  initTriggers = (mapId) => {
    Model.Trigger.findAll({
      where: {
        mapId: mapId
      }
    }).then((triggers) => {
      triggers.forEach((trigger) => {
        this.addTrigger(trigger)
      })
    })
  }

  addTrigger = (modelTrigger) => {
    const trigger = this.factory.buildTrigger(modelTrigger)
    trigger.triggered = false
    this.triggers.set(trigger.id, trigger)
  }

  deleteTrigger = (trigger) => {
    this.triggers.delete(trigger.id)
  }

  check = () => {
    for (const [id, trigger] of this.triggers) {
      const check = trigger.check(this.state)
      if (!trigger.triggered && check) {
        trigger.action.execute(trigger, this.primus)
        trigger.triggered = true
      } else if (trigger.triggered && !check) {
        trigger.triggered = false
      }
    }
  }
}

export default Notifier
