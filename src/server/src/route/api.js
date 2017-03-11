import express from 'express'
import { tags, tagHistory, anchors, map } from '../../../datamocking/data.js'


const api = new express()

api.get('/', (req, res, _next) => {
  res.json({working: true})
})

/**
 * @api {get} /map Request Map
 * @apiName GetMap
 * @apiGroup Map
 *
 * @apiSuccess {Integer} mapId Map ID
 * @apiSuccess {String} mapName Map name
 * @apiSuccess {String} mapURL URL to image of the map
 * @apiSuccess {Number} x Max distance in x direction
 * @apiSuccess {Number} y Max distance in y direction
 * @apiSuccess {Number} z Max distance in z direction
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "mapId": 1,
 *       "mapName": "Demo Map",
 *       "mapURL": "someurltomapimage",
 *       "x": 40,
 *       "y": 40,
 *       "z": 2
 *     }
 */
api.get('/map', (_req, res, _next) => {
  res.json(map)
})


/**
 * @api {get} /tags Request All Tags
 * @apiName GetTags
 * @apiGroup Tag
 *
 * @apiSuccess {Object[]} tags Array of all tags
 * @apiSuccess {Integer} tags.tagId The unique tag id
 * @apiSuccess {String} tags.tagName The tag name
 * @apiSuccess {Integer} tags.mapId Id of the map this tag exists on
 * @apiSuccess {Integer} tags.hardwareVersion The tag's hardware version
 * @apiSuccess {Integer} tags.firmwareVersion The tag's firmware version
 * @apiSuccess {Number} tags.battery The tag's battery
 * @apiSuccess {Number} tags.updateRate The tag's update rate
 * @apiSuccess {Integer} tags.iconNumber The tag's icon number
 * @apiSuccess {String} tags.iconColor The tag's icon hex color
 * @apiSuccess {Object} tags.position The tag's position object
 * @apiSuccess {Number} tags.position.x The tag's position x-coord
 * @apiSuccess {Number} tags.position.y The tag's position y-coord
 * @apiSuccess {Number} tags.position.z The tag's position z-coord
 * @apiSuccess {String} tags.position.timestamp Timestamp
 * @apiSuccess {Object[]} tags.labels Array of labels associated with the tag
 * @apiSuccess {Object} tags.labels.label Label associated with tag
 * @apiSuccess {Integer} tags.labels.label.labelId Label id
 * @apiSuccess {String} tags.labels.label.labelName Label name
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "tags": [
 *          {
 *            "tagId": 5,
 *            "tagName": "Maximus",
 *            "mapId": 4,
 *            "hardwareVersion": 12,
 *            "firmwareVersion": 11,
 *            "battery": 0.5,
 *            "updateRate": 1.2,
 *            "iconNumber": 1,
 *            "iconColor": "ee11ff",
 *            "position": {
 *              "x": 10,
 *              "y": 25,
 *              "z": 1,
 *              "timestamp": "2017-03-07T15:31:31.456+01:00"
 *            },
 *            "labels": [
 *              {
 *                "labelId": 1,
 *                "labelName": "Cart"
 *              }
 *            ]
 *          }
 *        ]
 *      }
 */
api.get('/tags', (req, res, _next) => {
  res.json(tags)
})

/**
 * @api {get} /tag/:id/history Request Tag History
 * @apiName GetTagHistory
 * @apiGroup Tag
 *
 * @apiSuccess {Integer} tagId Tag ID
 * @apiSuccess {Object} interval Interval
 * @apiSuccess {String} interval.begin Earliest possible time of interval in ISO 8601
 * @apiSuccess {String} interval.end Latest possible time of interval in ISO 8601
 * @apiSuccess {Object[]} positions Historic positions in order
 * @apiSuccess {Number} positions.position.x Position on X axis
 * @apiSuccess {Number} positions.position.y Position on Y axis
 * @apiSuccess {Number} positions.position.z Position on Z axis
 * @apiSuccess {String} positions.position.timestamp Timestamp in ISO 8601
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "tagId": 12,
 *       "interval": {
 *          "begin": "2017-03-07T15:31:31.456+01:00",
 *          "end": "2017-03-07T16:31:31.456+01:00"
 *       },
 *       "positions": [
 *          {
 *            "x": 12.0000021,
 *            "y": 105.12555,
 *            "z": 0.04,
 *            "timestamp": "2017-03-07T16:31:20.456+01:00"
 *          },
 *          {
 *            "x": 13.678384,
 *            "y": 104.34592555,
 *            "z": 0.04,
 *            "timestamp": "2017-03-07T16:31:21.456+01:00"
 *          },
 *          {
 *            "x": 14.021,
 *            "y": 104.1232555,
 *            "z": 0.04,
 *            "timestamp": "2017-03-07T16:31:23.456+01:00"
 *          }
 *        ]
 *      }
 */
api.get('/tag/:id/history', (req, res, _next) => {
  res.json(tagHistory)
})

/**
 * @api {get} /labels Request All Labels
 * @apiName GetLabels
 * @apiGroup Tag
 *
 * @apiSuccess {Object[]} labels Array of all labels
 * @apiSuccess {Integer} labelId Label ID
 * @apiSuccess {String} labelName Label name
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "labels": [
 *          {
 *            "labelId": 1,
 *            "labelName": "Label1",
 *          },
 *          {
 *            "labelId": 2,
 *            "labelName": "Label2",
 *          },
 *          {
 *            "labelId": 3,
 *            "labelName": "Label3",
 *          }
 *        ]
 *      }
 */

/**
 * @api {get} /tag Delete Label for Tag
 * @apiName DeleteTagLabel
 * @apiGroup Tag
 */
api.delete('/tag/:id/label', (req, res, _next) => {
  res.json({tagId: req.params.id, labelId: req.params.labelid, deleted: true})
})

/**
 * @api {get} /anchor Request All Anchors
 * @apiName GetAnchors
 * @apiGroup Anchor
 *
 * @apiSuccess {Object[]} anchors Array of all anchors
 * @apiSuccess {Integer} anchors.anchorId The unique anchor id
 * @apiSuccess {String} anchors.anchorName The anchir name
 * @apiSuccess {Integer} anchors.mapId Id of the map this anchor exists on
 * @apiSuccess {Integer} anchors.hardwareVersion The anchor's hardware version
 * @apiSuccess {Integer} anchors.firmwareVersion The anchor's firmware version
 * @apiSuccess {Object} anchors.position The anchor's position object
 * @apiSuccess {Number} anchors.position.x The anchor's position x-coord
 * @apiSuccess {Number} anchors.position.y The anchor's position y-coord
 * @apiSuccess {Number} anchors.position.z The anchor's position z-coord
 * @apiSuccess {Integer} anchors.status The anchor's status
 * @apiSuccess {Number} anchors.timestamp The anchor's timestamp
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "anchors": [
 *          {
 *            "anchorId": 5,
 *            "anchorName": "Maximus",
 *            "mapId": 4,
 *            "hardwareVersion": 12,
 *            "firmwareVersion": 11,
 *            "position": {
 *              "x": 12.0000021,
 *              "y": 105.12555,
 *              "z": 0.04
 *            },
 *            "status": 0,
 *            "timestamp": "2017-03-07T15:31:31.456+01:00"
 *          }
 *        ]
 *      }
 */
api.get('/anchor', (req, res, _next) => {
  res.json(anchors)
})


/**
 * @api {get} /tag/:id Request Tag Information
 * @apiName GetTag
 * @apiGroup Tag
 *
 * @apiParam {Number} id Unique Tag Id
 *
 * @apiSuccess {Number} id Unique Tag Id.
 * @apiSuccess {String} color The hexadecimal color of the tag.
 * @apiSuccess {String} name  The tag's name.
 */
api.get('/tag/:id', (req, res, _next) => {
  res.json({id: req.params.id, color: '4286f4', name: 'Maximus'})
})

export default api
