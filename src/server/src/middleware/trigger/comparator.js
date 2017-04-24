class Comparator {

  reference

  constructor(reference) {
    this.reference = reference
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
