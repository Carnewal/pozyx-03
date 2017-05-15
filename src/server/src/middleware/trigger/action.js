class Action {

  message
  type

  constructor(message, type) {
    this.message = message
    this.type = type
  }

  execute(trigger, primus) {
    Action.log(trigger.tags)
    this[this.type](trigger.tags, primus)
  }

  static log(trigger) {
    //TODO
    trigger.tags
  }

  print() {
    console.log(this.message)
  }

  printTags(trigger) { //Dummy version
    console.log(trigger.tags)
  }

  notify(trigger, primus) {
    primus.write({
      action: 'ADD_NOTIFICATION',
      notification: {
        id: trigger.id,
        name: trigger.name,
        time: new Date().toISOString(),
        url: "https://www.google.be"
      }
    })
  }

}

export default Action
