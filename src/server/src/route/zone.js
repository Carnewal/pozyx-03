import {Router} from 'express'
import model from '../model'

const api = Router()
/**
 * @api {get} /map/:id/zones Request Map zones
 * @apiName GetMapZones
 * @apiDescription Gets all the zones from the map
 * @apiGroup Zone
 *
 * @apiParam {Integer} id Map ID
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "zones": [
 *          {
 *            id: 1,
 *            name: "zone1",
 *            polygon: [
 *              {
 *                x: 1,
 *                y: 1
 *              }
 *            ],
 *            mapId: 1
 *          }
 *        ]
 *      }
 *
 *
 */
api.get('/map/:mapId/zones', (_req, _res) => {
  model.Zone.findAll({
    where: {
        mapId: _req.params.mapId
    }
  }).then(function(zones){
      const result = []
      zones.forEach(function(data){
          const zone = data.dataValues
          delete zone.createdAt
          delete zone.updatedAt

          const tempcoordinates = zone.polygon.coordinates[0]
          zone.polygon = []

          tempcoordinates.forEach(function(coordinate) {
            const coord = {}
            coord.x = coordinate[0]
            coord.y = coordinate[1]
            zone.polygon.push(coord)
          })

          result.push(zone)
      })

        _res.json({zones: result})
  })
})

/**
 * @api {post} /map/:id/zone Create Map zones
 * @apiName CreateMapZone
 * @apiDescription Creates a zone on the map
 * @apiGroup Zone
 *
 * @apiParam {Integer} id Map ID
 * @apiParam {String} name Zone name
 * @apiParam {String} color Zone color
 * @apiParam {Object[]} polygon Zone corners
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "created": true
 *     }
 */
api.post('/map/:mapId/zone', (_req, _res) => {
  const zoneData = _req.b

  //reads the coordinates from the body (bodyParser)
  //constructs a polygon (Sequelize)
  const coordinates = [[]]
  _req.body.polygon.forEach(function(coordinate) {
    coordinates[0].push([coordinate.x, coordinate.y])
  })
  const polygon = {type: 'Polygon', coordinates}
  zoneData.polygon = polygon

  //finds the map, creates the zone, adds the zone to the map, saves the map
  model.Map.find({
    where: {
      id: _req.params.mapId
    },
    include: [{
      model: model.Zone,
      as: 'zones'
    }]
  }).then(function(map) {
    model.Zone.create(zoneData).then(function(zone) {
      map.addZone(zone)
      map.save()

      _res.status(201).json({created:true})
    })
  })
})

/**
 * @api {delete} /zones/:id Delete Map zones
 * @apiName DeleteMapZone
 * @apiDescription Delete a zone on the map
 * @apiGroup Zone
 *
 * @apiParam {Integer} id Zone ID
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "deleted": true
 *     }
 */
api.delete('/zones/:id', (_req, _res) => {
  model.Zone.destroy({
      where: {
        id: _req.params.id
      }
  })

  _res.json({deleted:true})
})

export default api
