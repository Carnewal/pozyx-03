import State from './state'

class Notifier {
  prevState = new State()
  currState = new State()
  triggers = new Map()

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
