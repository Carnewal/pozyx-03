import Comparator from './comparator'
import Filter from './filter'
import Action from './action'

class Factory {

  buildTrigger(modelTrigger) {
    const trigger = {}
    trigger.name = modelTrigger.dataValues.name
    trigger.id = modelTrigger.dataValues.id

    if (!modelTrigger.json) return trigger

    const json = JSON.parse(modelTrigger.json)
    const comparator = new Comparator(json.comparator.value, json.comparator.type)
    const filters = []
    json.filters.forEach((filter) => {
      filters.push(new Filter(filter.value, filter.type))
    })


    trigger.check = (state) => {
      const tags = Array.from(state.tags.values())
      trigger.tags = filters.reduce((acc, filter) => acc.length > 0 ? filter.execute(acc, state) : [], tags)
      return comparator.execute(trigger.tags.length)
    }

    trigger.action = new Action(json.action.value, json.action.type)

    return trigger
  }

}

export default Factory
