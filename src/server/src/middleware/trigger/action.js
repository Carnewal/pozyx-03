class Action {

  message
  type

  constructor(message, type) {
    this.message = message
    this.type = type
  }

  execute(tags) {
    this[this.type](tags)
  }

  print() {
    console.log(this.message)
  }

  printTags(tags) { //Dummy version
    console.log(tags)
  }

}

export default Action
