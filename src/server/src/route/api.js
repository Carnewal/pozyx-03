import {Router} from 'express'
import mapRoutes from './map'
import anchorRoutes from './anchor'
import tagRoutes from './tag'


const api = Router()

api.get('/', (req, res) => {
  res.json({working: true})
})

api.use('/', mapRoutes)
api.use('/', anchorRoutes)
api.use('/', tagRoutes)

export default api
