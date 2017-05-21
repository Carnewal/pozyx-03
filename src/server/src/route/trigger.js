import {Router} from 'express'
import model from '../model'

const api = Router()

/**
 * @api {get} /map/:map_id/triggers Request All Triggers
 * @apiName GetTriggers
 * @apiGroup Trigger
 *
 * @apiParam {Integer} map_id Map ID
 *
 * @apiSuccess {Object[]} triggers Array of all triggers
 * @apiSuccess {Integer} id Trigger ID
 * @apiSuccess {String} name Trigger name
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "triggers": [
 *         {
 *           "id": 1,
 *           "name": "At least five tags in exit zone",
 *           "active": true,
 *           "json": "json string, example below"
 *         },
 *         {
 *           "id": 2,
 *           "name": "At least one tag with low battery",
 *           "active": true,
 *           "json": "json string, example below"
 *         }
 *       ]
 *     }
 *
 *     Example of parsed "json string"
 *     {
 *       "filters": [
 *         {
 *           "type": "inZone",
 *           "value": 1
 *         },
 *         {
 *           "type": "battery",
 *           "value": [0, 0.2]
 *         }
 *       ],
 *       "comparator": {
 *         "type": "atLeast",
 *         "value": 5
 *       },
 *       "action": {
 *         "type": "print",
 *         "value": "Message that will be printed when triggered."
 *       }
 *     }
 */
api.get('/map/:map_id/triggers', (req, res) => {
  model.Trigger.findAll({
    where: {
      mapId: req.params.id
    }
  }).then((triggers) => {
    res.json({triggers: triggers})
  })
})


/**
 * @api {post} /map/:map_id/triggers Add Trigger
 * @apiName AddTrigger
 * @apiGroup Trigger
 *
 * @apiParam {Integer} map_id Map ID
 *
 * @apiSuccessExample
 * {
 *   "id": 4,
 *   "active": false,
 *   "updatedAt": "2017-05-21T15:37:31.000Z",
 *   "createdAt": "2017-05-21T15:37:31.000Z"
 * }
 */
api.post('/map/:map_id/triggers', (req, res) => {
  const trigger = model.Trigger.build({active: false})
  trigger.save().then((trigger) => {
    res.status(200).json(trigger)
  }).catch((err) => {
    res.status(500).json({
      error: err
    })
  })
})

/**
 * @api {put} /map/:map_id/trigger/:trigger_id Edit Trigger
 * @apiName EditTrigger
 * @apiGroup Trigger
 *
 * @apiParam {Integer} map_id Map ID
 * @apiParam {Integer} trigger_id Trigger ID
 *
 * @apiSampleRequest
 * {
 *   "name": "At least 2 red tags in living",
 *   "json" : {
 *     "id": 1,
 *     "name": "At least 2 red tags in living",
 *     "active": true,
 *     "comparator": {
 *  	  "type": "atLeast",
 *      "value": 2
 *     },
 *     "action": {
 *       "type": "notify",
 *       "value": ""
 *     },
 *     "filters": [
 *       {
 *         "type": "inZone",
 *         "value": 2
 *       },
 *       {
 *       	"type": "label",
 *       	"value": "rood"
 *       }
 *     ]
 *   }
 *  }
 */
api.put('/map/:map_id/trigger/:trigger_id', (req, res) => {
  model.Trigger.update(
    {
      mapId: req.params.map_id,
      active: req.body.active,
      name: req.body.name,
      json: JSON.stringify(req.body.json),
    },
    {where: {id: req.params.trigger_id}}
  ).then((trigger) => {
    res.status(200).json(trigger)
  }).catch((err) => {
    res.status(500).json(err)
  })
})

export default api
