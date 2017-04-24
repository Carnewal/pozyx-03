import Comparator from './comparator'
import Filter from './filter'
import Action from './action'

class Factory {

  buildTrigger(args) {
    const compare = new Comparator(args.amountValue)[args.amount]
    const filter = new Filter(args.filterValue)
    const trigger = {}

    trigger.check = (state) => {
      const objects = state[args.objects]
      let size = 0
      objects.forEach((value) => {
        if (filter[args.filter](value)) size++
      })
      return compare(size, args.value)
    }

    trigger.action = new Action(args.actionMessage)[args.action]

    return trigger
  }

}

export default Factory
