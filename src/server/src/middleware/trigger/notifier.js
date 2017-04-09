import State from './state'
import Model from '../model'

class Notifier {
  prevState = new State()
  currState = new State()
  triggers = new Map()

  initState = (mapId) => { //TODO Anchor/zone implementation
    Model.Tag.findAll({
      where: {
        mapId: mapId
      },
      include: [{model: Model.Label, through: Model.TagLabel, as: 'labels'}]
    }).then((tags) => {
      tags.forEach((tag) => {
        this.prevState.updateTag(tag)
      })
      this.currState = this.prevState
    })
  }

  updateState = (changes) => {
    this.prevState = this.currState
    changes.tags.forEach((tag) => {
      this.currState.updateTag(tag)
    })
    changes.zones.forEach((tag) => {
      this.currState.updateZone(tag)
    })
    changes.anchors.forEach((tag) => {
      this.currState.updateAnchor(tag)
    })
    this.check()
  }

  initTriggers = (mapId) => {
    //TODO get existing triggers from db and add to triggers map
  }

  addTrigger = (trigger) => {
    this.triggers.set(trigger.id, trigger)
  }

  deleteTrigger = (trigger) => {
    this.triggers.delete(trigger.id)
  }

  check = () => {
    for (const [id, trigger] of this.triggers) {
      if (trigger.check(this.prevState, this.currState)) {
        trigger.action()
      }
    }
  }
}

export default Notifier
