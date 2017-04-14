import {Router} from 'express'
import model from '../model'
import upload from '../middleware/image'

const api = Router()

/**
 * @api {get} /maps Request Maps
 * @apiName GetMaps
 * @apiGroup Map
 *
 * @apiSuccess {Object[]} maps Array of all maps
 * @apiSuccess {Integer} maps.id Map ID
 * @apiSuccess {String} maps.name Map name
 * @apiSuccess {String} maps.mapURL URL to image of the map
 * @apiSuccess {Number} maps.x Max distance in x direction
 * @apiSuccess {Number} maps.y Max distance in y direction
 * @apiSuccess {Number} maps.z Max distance in z direction
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "maps": [
 *         {
 *           "id": 1,
 *           "name": "Demo Map",
 *           "url": "http://some.url.to.map.image.png",
 *           "x": 40,
 *           "y": 40,
 *           "z": 2
 *         }
 *       ]
 *     }
 */
api.get('/maps', (req, res) => {
  model.Map.findAll().then((maps) => {
    res.json({maps: maps})
  })
})

/**
 * @api {get} /map/:id Request Map
 * @apiName GetMap
 * @apiGroup Map
 *
 * @apiParam {Integer} id Map ID
 *
 * @apiSuccess {Object} map map
 * @apiSuccess {Integer} map.mapId Map ID
 * @apiSuccess {String} map.mapName Map name
 * @apiSuccess {String} map.mapURL URL to image of the map
 * @apiSuccess {Number} map.x Max distance in x direction
 * @apiSuccess {Number} map.y Max distance in y direction
 * @apiSuccess {Number} map.z Max distance in z direction
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "map": {
 *         "id": 1,
 *         "name": "Demo Map",
 *         "url": "http://some.url.to.map.image.png",
 *         "x": 40,
 *         "y": 40,
 *         "z": 2
 *       }
 *     }
 */
api.get('/map/:id', (req, res) => {
  model.Map.findById(req.params.id).then((map) => {
    if (map) {
      res.json({map: map})
    } else {
      res.status(404)
      res.send({error: 'No entry for map with id ' + req.params.id})
    }
  })
})

/**
 * @api {post} /map/:id/image Upload Map image
 * @apiName PostMapImage
 * @apiDescription When testing with postman, disable the Content-Type header and send the file in Body -> form-data.
 * @apiGroup Map
 *
 * @apiParam {Integer} id Map ID (GET param)
 * @apiParam {File} mapimage Map Image File (multipart/form-data),
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "uploaded": true,
 *       "mapURL": "public/maps/5.png"
 *     }
 */

api.post('/map/:id/image', upload.single('mapimage'), (req, res) => {
  const {file} = req
  if (req.fileValidationError) {
    return res.status(400).json({uploaded: false, error: req.fileValidationError})
  } else if (!file) {
    return res.status(400).json({uploaded: false, error: "Request form-data didn't contain a mapimage file."})
  }
  res.json({uploaded: true, mapURL: 'public/maps/' + file.filename})
})


/**
 * @api {get} /map/:id/image Request Map image
 * @apiName GetMapImage
 * @apiDescription Gets the map image (.png) file.
 * @apiGroup Map
 *
 * @apiParam {Integer} id Map ID
 *
 */

api.get('/map/:id/image', (_req, _res) => {

})

export default api
