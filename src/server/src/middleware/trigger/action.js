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
    return () => {
      console.log(this.message)
    }
  }

  printTags(tags) { //Dummy version
    return () => {
      console.log(tags)
    }
  }

}

export default Action
