import {Router} from 'express'
import mapRoutes from './map'
import anchorRoutes from './anchor'
import tagRoutes from './tag'
import zoneRoutes from './zone'

const api = Router()

api.get('/', (req, res) => {
  res.json({working: true})
})

api.use('/', mapRoutes)
api.use('/', anchorRoutes)
api.use('/', tagRoutes)
api.use('/', zoneRoutes)

export default api
