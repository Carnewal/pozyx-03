import Compare from './compare'
import Filter from './filter'
import Action from './action'

class Factory {

  buildTrigger(args) {
    const compare = Compare[args.amount]
    const filter = Filter[args.filter]
    const trigger = {}

    trigger.checkState = (state) => {
      const objects = state[args.objects]
      const size = objects.filter(filter)
      return compare(size, args.value)
    }

    trigger.check = (prevState, currState)
      => (!this.checkState(prevState) && this.checkState(currState))

    trigger.action = Action[args.action]

    return trigger
  }

}

export default Factory
