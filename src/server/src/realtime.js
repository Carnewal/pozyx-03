import Primus from 'primus'
import Notifier from './middleware/trigger/notifier'
import Model from './model'

const maxdistance = {x: 225, y: 150, z: 3} // meter

const interval = 1000 / 30

const BatteryModes = {
  CHARGE: {value: 0.001},
  DRAIN: {value: -0.001},
  FREEZE: {value: 0}
}

class Tag {
  constructor(modelTag, speed) {
    this.id = modelTag.id
    this.name = modelTag.name
    this.labels = modelTag.labels
    this.timestamp = new Date().toISOString()
    this.position = {
      x: Math.random() * maxdistance.x,
      y: Math.random() * maxdistance.y,
      z: Math.random() * maxdistance.z
    }
    const x = 1 - Math.random() * 2
    const y = Math.random() > 0.5 ? Math.sqrt(1.0 - x * x) : -Math.sqrt(1.0 - x * x)
    this.direction = {                      // should be unitvector
      x: x,
      y: y,
      z: 0
    }
    this.speed = speed
    this.originalSpeed = speed
    this.haltAtTarget = true
    this.targetLocation = false
    this.batteryLevel = 1.0                 //hardcoded
    this.batteryMode = BatteryModes.FREEZE  //discharging disabled
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
    if (this.speed === 0) {
      return
    }

    if (this.targetLocation && this.haltAtTarget) {

      const margin = 5

      //squaring all calculations to prevent using root (performance)
      //(X1 - X2)² + (Y1 - Y2)² = distance²
      if (((this.targetLocation.x - this.position.x) * (this.targetLocation.x - this.position.x) ///(X1 - X2) * (X1 - X2) => (X1 - X2)²
        + (this.targetLocation.y - this.position.y) * (this.targetLocation.y - this.position.y)) < (margin * margin)) {
        this.speed = 0
        return
      }
    }

    this.moveInDirection("x")
    this.moveInDirection("y")
    this.moveInDirection("z")
  }

  batteryTick() {
    if (this.batteryMode === BatteryModes.FREEZE) {
      return
    }

    this.batteryLevel += this.batteryMode.value

    if (this.batteryLevel > 1.0) {
      this.batteryMode = BatteryModes.FREEZE
      this.batteryLevel = 1.0
    }

    if (this.batteryLevel < 0.0) {
      this.batteryMode = BatteryModes.FREEZE
      this.batteryLevel = 0.0
    }

  }
}

class Manager {
  constructor(tags, speed, interval, factor) {
    this.tags = []
    this.interval = interval
    for (let i = 0; i < tags.length; i++) {
      const rand = speed * (factor / 3)
      const adjusted_speed = speed + (rand / 2) - (Math.random() * rand) // randomly +/- factor speed
      this.adjusted_speed *= interval / 5000 // take interval into account
      this.tags.push(new Tag(tags[i], adjusted_speed))
    }
  }

  update() {
    this.tags.forEach(function(tag) {
      tag.move()
      tag.timestamp = Date.now()
      tag.batteryTick()
    })
  }

  /**
   * (optional) teleportLocations: array of locations [x,y] to immediatly teleport tags to
   * (optional) targetLocations: array of locations [x,y] for the tags to move towards (after teleporting)
   * (optional) haltAtTarget: set speed to zero when reached/near targetLocation
   * calling teleport without parameters (undef, undef, false) resumes tags at their original speed
   */
  teleport(teleportLocations, targetLocations, haltAtTarget = true) {
    this.tags.forEach(function(tag, i) {

      tag.speed = tag.originalSpeed

      if (teleportLocations[i] === undefined) {
        return
      }

      tag.position = teleportLocations[i]
      tag.targetLocation = targetLocations[i]
      const deltaX = tag.targetLocation.x - tag.position.x
      const deltaY = tag.targetLocation.y - tag.position.y
      const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      tag.direction = {
        x: deltaX / length,
        y: deltaY / length,
        z: 0
      }


      tag.haltAtTarget = haltAtTarget
    })
  }

  /**
   *
   * @param modes Applicable modes are "CHARGE", "DRAIN" and "FREEZE"
   */
  setBatteryMode(modes) {
    if (modes instanceof Array) {
      // assign each tags their respective mode (same index)
      // if there are more tags than modes given the first mode is used for the remainder of tags
      this.tags.forEach((tag, i) => tag.batteryMode = modes[i] ? BatteryModes[modes[i]] : BatteryModes[modes[0]])
    } else if (BatteryModes[modes]) {
      // when modes isn't an array it is assumed it's a battery mode for all tags
      this.tags.forEach((tag) => tag.batteryMode = BatteryModes[modes])
    }
  }

}

class Realtime {

  constructor(server) {
    const primus = new Primus(server, {})
    const notifier = new Notifier()
    notifier.initState(2) //INIT with map id 2
    notifier.initTriggers(2)

    primus.on('connection', () => {
      console.log('client connected')
    })

    Model.Tag.findAll({
      where: {
        mapId: 2 ////hardcoded
      }
    }).then((tags) => {
      this.mgr = new Manager(
        tags, // tags from db
        1, // speed in meter / s
        interval, // interval time in ms
        5 // +/- random factor on speed
      )
      this.timer = setInterval(() => {
        this.mgr.update()

        const tagData = []

        this.mgr.tags.forEach(function(tag) {
          const timestamp = new Date.toISOString()
          const newTag = {
            name: tag.name,
            id: tag.id,
            labels: tag.labels,
            batteryLevel: tag.batteryLevel,
            batteryMode: tag.batteryMode,
            speed: tag.speed,
            originalSpeed: tag.originalSpeed,
            position: {
              timestamp: timestamp,
              x: tag.position.x,
              y: tag.position.y,
              z: tag.position.y
            },
            //for compatibility
            timestamp: timestamp,
            x: tag.position.x,
            y: tag.position.y,
            z: tag.position.z,
          }
          tagData.push(newTag)
        })
        notifier.updateState({tags: tagData})
        primus.write({action: 'SHOW_POSITIONS', positions: tagData})
      }, interval)
    })
  }

}

export default Realtime
