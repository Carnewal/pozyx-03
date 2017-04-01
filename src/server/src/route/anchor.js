import model from '../model'
import {Router} from 'express'

const api = Router()

/**
 * @api {get} /map/:map_id/anchors Request All Anchors
 * @apiName GetAnchors
 * @apiGroup Anchor
 *
 * @apiSuccess {Object[]} anchors Array of all anchors
 * @apiSuccess {Integer} anchors.anchorId Anchor ID
 * @apiSuccess {String} anchors.anchorName Name
 * @apiSuccess {Integer} anchors.mapId Map ID of map this anchor is in
 * @apiSuccess {Integer} anchors.hardwareVersion Hardware version
 * @apiSuccess {Integer} anchors.firmwareVersion Firmware version
 * @apiSuccess {Object} anchors.position position coordinates
 * @apiSuccess {Number} anchors.position.x Position on X axis
 * @apiSuccess {Number} anchors.position.y Position on Y axis
 * @apiSuccess {Number} anchors.position.z Position on Z axis
 * @apiSuccess {Integer} anchors.status Latest status
 * @apiSuccess {Number} anchors.timestamp Timestamp last update
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "anchors": [
 *         {
 *           "anchorId": 5,
 *           "anchorName": "Maximus",
 *           "mapId": 4,
 *           "hardwareVersion": 12,
 *           "firmwareVersion": 11,
 *           "position": {
 *             "x": 12.0000021,
 *             "y": 105.12555,
 *             "z": 0.04
 *           },
 *           "status": 0,
 *           "timestamp": "2017-03-07T15:31:31.456"
 *         }
 *       ]
 *
 */
api.get('/map/:map_id/anchors', (req, res) => {
  model.Anchor.findAll({
    where: {
      mapId: req.params.map_id
    }
  }).then((anchors) => {
    res.json({anchors: anchors})
  })
})

export default api



