import Primus from 'primus'
import Notifier from './middleware/trigger/notifier'
import Model from './model'

const maxdistance = {x: 225, y: 150, z: 3} // meter

const interval = 1000 / 30

const BatteryModes = {   CHARGE: {value : 0.1},
                         DRAIN: {value: -0.1},
                         FREEZE: {value: 0} 
}

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
    this.direction = { // should be unitvector
      x: x,
      y: y,
      z: 0
    }
    this.speed = speed
    this.batteryLevel = 1.0
    this.batteryMode = BatteryModes.FREEZE
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
    if (this.speed == 0) {
      return
    }

    if (this.haltAtTarget) {
      //squaring all calculations to prevent using root
      let distance = (maxdistance.x * maxdistance.x + maxdistance.y * maxdistance.y)  
      let margin = distance / 100 * 5 //5 percent error margin

      //untested, may and probably totally wont work
      if (((this.targetLocation.x - this.position[x]) * (this.targetLocation.x - this.position[x]) //(X1 - X2)² + (Y1 - Y2)² = distance²
          + (this.targetLocation.y - this.position[y]) * (this.targetLocation.y - this.position[y])) / distance < margin) {
          this.speed = 0
          return
      } 
    }

    this.moveInDirection("x")
    this.moveInDirection("y")
    this.moveInDirection("z")
  }

  batteryTick(){
   if (this.batteryMode = BatteryModes.FREEZE){
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
      this.tags.push(new Tag(tags[i].id, adjusted_speed))
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
      * (optional) haltAtTarget: set speed to zero when reached (near) targetLocation
      */
    teleport(teleportLocations, targetLocations, haltAtTarget = false) { 
      let i = 0
      this.tags.forEach(function(tag) {
        if (teleportLocations[i] !== undefined) {
          tag.position = teleportLocations[i]
        } 

        if (targetLocations[i] === undefined) {
          return
        }

        tag.direction = {
          x: (targetLocations[i].x - this.position[x]) / maxdistance.x,
          y: (targetLocations[i].y - this.position[y]) / maxdistance.y,
          z: 0
        } 

        this.targetLocation = targetLocations[i]
        this.haltAtTarget = haltAtTarget
        i++
      })
    }

  /**
    * mode: {charge, drain, freeze}
    */
  setBatteryMode(modes) {
    let i = 0
    this.tags.forEach(function(tag) {
      switch (modes[i]) {
        case charge:
          this.batteryMode = BatteryModes.CHARGE
          break
        case drain:
           this.batteryMode = BatteryModes.DRAIN
          break
        case freeze:
           this.batteryMode = BatteryModes.FREEZE
          break
        default:
          console.log("setBatteryMode function invoked with a parameter other as 'charge', 'drain' or 'freeze'")
      }
      i++
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
      mapId: 2 ////hardcoded
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
