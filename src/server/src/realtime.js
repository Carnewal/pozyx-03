import Primus from 'primus'
import Notifier from './middleware/trigger/notifier'
import Model from './model'

const maxdistance = {x: 225, y: 150, z: 3} // meter

const interval = 1000 / 30

class Tag {
  constructor(tagId, speed) {
    this.tagId = tagId
    this.timestamp = new Date().toISOString()
    this.position = {
      x: Math.random() * maxdistance.x,
      y: Math.random() * maxdistance.y,
      z: Math.random() * maxdistance.z
    }
    const x = 1 - Math.random() * 2
    const y = Math.random() > 0.5 ? Math.sqrt(1.0 - x * x) : -Math.sqrt(1.0 - x * x)
    this.direction = { // moet eenheidsvector zijn
      x: x,
      y: y,
      z: 0
    }
    this.speed = speed
  }

  moveInDirection(dir, val) {
    if (!dir || !/^[x-z]+$/.test(dir)) {
      return
    }
    if (!val) {
      this.position[dir] += this.direction[dir] * this.speed
    } else {
      this.position[dir] += val
    }
    if (this.position[dir] > maxdistance[dir]) {
      this.direction[dir] *= -1
      this.moveInDirection(dir, maxdistance[dir] - this.position[dir])
    }
    if (this.position[dir] < 0) {
      this.direction[dir] *= -1
      this.moveInDirection(dir, -this.position[dir])
    }
  }

  move() {
    this.moveInDirection("x")
    this.moveInDirection("y")
    this.moveInDirection("z")
  }
}

class Manager {
  constructor(tags, speed, interval, factor) {
    this.tags = []
    this.interval = interval
    for (let i = 0; i < tags.length; i++) {
      const rand = speed * factor
      const adjusted_speed = speed + (rand / 2) - (Math.random() * rand) // randomly +/- factor speed
      this.adjusted_speed *= interval / 2000 // take interval into account
      this.tags.push(new Tag(tags[i].id, adjusted_speed))
    }
  }

  update() {
    this.tags.forEach(function(tag) {
      tag.move()
      tag.timestamp = Date.now()
    })
  }
}

const realtime = (server) => {
  const primus = new Primus(server, {})
  const notifier = new Notifier() //TODO notifier integreren in live data
  notifier.initState(2) //INIT with map id 2
  notifier.initTriggers(2)

  primus.on('connection', () => {
    console.log('client connected')
  })

  Model.Tag.findAll({
    where: {
      mapId: 2
    }
  }).then((tags) => {
    const mgr = new Manager(
      tags, // tags from db
      1, // speed in meter / s
      interval, // interval time in ms
      5 // +/- random factor on speed
    )
    setInterval(() => {
      mgr.update()

      const tagPositions = []

      mgr.tags.forEach(function(tag) {
        const tagPosition = {
          tagId: tag.tagId,
          id: tag.tagId,
          position: {
            x: tag.position.x,
            y: tag.position.y,
            z: tag.position.z,
            timestamp: new Date().toISOString()
          },
          x: tag.position.x,
          y: tag.position.y,
          z: tag.position.z,
          timestamp: new Date().toISOString()
        }
        tagPositions.push(tagPosition)
      })

      notifier.updateState({tags: tagPositions})
      primus.write({action: 'SHOW_POSITIONS', positions: tagPositions})
    }, interval)
  })
}


export default realtime
