class Action {

  message

  constructor(message) {
    this.message = message
  }

  print() {
    return () => {
      console.log(this.message)
    }
  }

}

export default Action
