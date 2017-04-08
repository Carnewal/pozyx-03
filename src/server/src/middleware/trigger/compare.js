function any() {
  return true
}

function exactly(ref, val) {
  return ref === val
}

function atLeast(ref, val) {
  return ref <= val
}

function lessThan(ref, val) {
  return ref > val
}

const compare = {
  "any": any,
  "exactly": exactly,
  "atLeast": atLeast,
  "lessThan": lessThan
}

export default compare
