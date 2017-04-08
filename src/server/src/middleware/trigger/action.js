function print(args) {
  return () => {
    console.log(args)
  }
}

const action = {
  "print": print
}

export default action
