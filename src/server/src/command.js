import {Router} from 'express'

const command = (app, realtime) => {
  const router = Router()
  router.post('/scenario', (req, res) => {
    const scenario = req.body.scenario
    switch (req.body.type) {
      case "TELEPORT":
        realtime.mgr.teleport(scenario)
        break
      case "BATTERY":
        realtime.mgr.setBatteryMode(scenario)
        break
    }
    res.status(200).json({success: true})
  })
  app.use('/command', router)
}

export default command

