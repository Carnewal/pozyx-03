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
 *           "amountValue": 5,
 *           "amount": "atLeast",
 *           "objects": "tags",
 *           "filterValue": "1",
 *           "filter": "inZone",
 *           "action": "print",
 *           "actionMessage": "At least five tags in exit zone"
 *         },
 *         {
 *           "id": 2,
 *           "name": "At least one tag with low battery",
 *           "active": true,
 *           "amountValue": 1,
 *           "amount": "atLeast",
 *           "objects": "tags",
 *           "filterValue": "20",
 *           "filter": "battery",
 *           "action": "print",
 *           "actionMessage": "At least one tag with low battery"
 *         }
 *       ]
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
 * TODO Docs
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
 * TODO Docs
 */
api.put('/map/:map_id/trigger/:trigger_id', (req, res) => {
  model.update(
    {
      active: req.body.active,
      amount: req.body.amount,
      amountValue: req.body.amountValue,
      objects: req.body.objects,
      filter: req.body.filter,
      filterValue: req.body.filterValue,
      action: req.body.action
    },
    {where: {id: req.param.trigger_id}}
  ).then((trigger) => {
    res.status(200).json(trigger)
  }).catch((err) => {
    res.status(500).json(err)
  })
})

export default api



