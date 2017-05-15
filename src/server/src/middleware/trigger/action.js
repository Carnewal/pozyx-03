class Action {

  message
  type

  constructor(message, type) {
    this.message = message
    this.type = type
  }

  execute(trigger, primus) {
    Action.log(trigger.tags)
    this[this.type](trigger, primus)
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
        time: new Date().toLocaleTimeString('nl-be', {
          hour12: false,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }),
        url: "https://www.google.be"
      }
    })
  }

}

export default Action
