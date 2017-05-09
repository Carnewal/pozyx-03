class Comparator {

  reference
  type

  constructor(reference, type) {
    this.reference = reference
    this.type = type
  }

  execute(val) {
    this[this.type](val)
  }

  any() {
    return true
  }

  exactly(value) {
    return value === this.reference
  }

  atLeast(value) {
    return this.reference <= value
  }

  lessThan(value) {
    return this.reference > value
  }

}

export default Comparator
