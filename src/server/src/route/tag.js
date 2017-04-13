import {Router} from 'express'
import model from '../model'

const api = Router()

/**
 * @api {get} /map/:id/tags Request All Tags
 * @apiName GetTags
 * @apiGroup Tag
 *
 * @apiParam {Integer} id Map ID
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
 *         {
 *           "id": 5,
 *           "name": "Maximus",
 *           "mapId": 4,
 *           "hardwareVersion": 12,
 *           "firmwareVersion": 11,
 *           "battery": 0.5,
 *           "updateRate": 1.2,
 *           "iconNumber": 1,
 *           "iconColor": "ee11ff",
 *           "position": {
 *             "x": 10,
 *             "y": 25,
 *             "z": 1,
 *             "timestamp": "2017-03-07T15:31:31.456"
 *           },
 *           "labels": [
 *             {
 *               "labelId": 1,
 *               "labelName": "Cart"
 *             }
 *           ]
 *         }
 *       ]
 *     }
 */
api.get('/map/:id/tags', (req, res) => {
  //TODO Fix mapId and MapId redundancy and fix TagLabel entry in every Label
  //TODO include last known position
  model.Tag.findAll({
    where: {
      mapId: req.params.id
    },
    include: [{model: model.Label, through: model.TagLabel, as: 'labels'}]
  }).then((tags) => {
    res.json({tags: tags})
  })
})

/**
 * @api {get} /map/:map_id/tag/:tag_id Request Tag
 * @apiName GetTag
 * @apiGroup Tag
 *
 * @apiParam {Integer} map_id Map ID
 * @apiParam {Integer} tag_id Tag ID
 *
 * @apiSuccess {Object} tag tag
 * @apiSuccess {Integer} tag.tagId The unique tag id
 * @apiSuccess {String} tag.tagName The tag name
 * @apiSuccess {Integer} tag.mapId Id of the map this tag exists on
 * @apiSuccess {Integer} tag.hardwareVersion The tag's hardware version
 * @apiSuccess {Integer} tag.firmwareVersion The tag's firmware version
 * @apiSuccess {Number} tag.battery The tag's battery
 * @apiSuccess {Number} tag.updateRate The tag's update rate
 * @apiSuccess {Integer} tag.iconNumber The tag's icon number
 * @apiSuccess {String} tag.iconColor The tag's icon hex color
 * @apiSuccess {Object} tag.position The tag's position object
 * @apiSuccess {Number} tag.position.x The tag's position x-coord
 * @apiSuccess {Number} tag.position.y The tag's position y-coord
 * @apiSuccess {Number} tag.position.z The tag's position z-coord
 * @apiSuccess {String} tag.position.timestamp Timestamp
 * @apiSuccess {Object[]} tag.labels Array of labels associated with the tag
 * @apiSuccess {Object} tag.labels.label Label associated with tag
 * @apiSuccess {Integer} tag.labels.label.labelId Label id
 * @apiSuccess {String} tag.labels.label.labelName Label name
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "tag": {
 *         "tagId": 5,
 *         "tagName": "Maximus",
 *         "mapId": 4,
 *         "hardwareVersion": 12,
 *         "firmwareVersion": 11,
 *         "battery": 0.5,
 *         "updateRate": 1.2,
 *         "iconNumber": 1,
 *         "iconColor": "ee11ff",
 *         "position": {
 *           "x": 10,
 *           "y": 25,
 *           "z": 1,
 *           "timestamp": "2017-03-07T15:31:31.456"
 *         },
 *         "labels": [
 *           {
 *             "labelId": 1,
 *             "labelName": "Cart"
 *           }
 *         ]
 *       }
 *     }
 */
api.get('/map/:map_id/tag/:tag_id', (req, res) => {
  //TODO Fix mapId and MapId redundancy and fix TagLabel entry in every Label
  //TODO include last known position
  model.Tag.findById(req.params.tag_id, {
    include: [{model: model.Label, as: 'labels'}]
  }).then((tag) => {
    res.json({tag: tag})
  })
})
/**
 * @api {get} map/:map_id/tag/:tag_id/positions?begin=:begin&end=:end Request Positions
 * @apiName GetPositions
 * @apiGroup Tag

 * @apiParam {Integer} map_id Map ID
 * @apiParam {Integer} tag_id Tag ID
 * @apiParam {DateTime} begin ISO 8601 DateTime that is the begin of interval
 * @apiParam {DateTime} end ISO 8601 DateTime that is the end of interval
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
 *          "begin": "2017-03-07T15:31:31.456",
 *          "end": "2017-03-07T16:31:31.456"
 *       },
 *       "positions": [
 *          {
 *            "x": 12.0000021,
 *            "y": 105.12555,
 *            "z": 0.04,
 *            "timestamp": "2017-03-07T16:31:20.456"
 *          },
 *          {
 *            "x": 13.678384,
 *            "y": 104.34592555,
 *            "z": 0.04,
 *            "timestamp": "2017-03-07T16:31:21.456"
 *          },
 *          {
 *            "x": 14.021,
 *            "y": 104.1232555,
 *            "z": 0.04,
 *            "timestamp": "2017-03-07T16:31:23.456"
 *          }
 *        ]
 *      }
 */
api.get('/map/:map_id/tag/:tag_id/positions/:begin/:end', (req, res) => {
  // Convert to Date before passing to our query to make sure it's the correct
  // format.
  const begin = new Date(req.params.begin).toISOString()
  const end = new Date(req.params.end).toISOString()

  model.Tag.findById(req.params.tag_id, {
    include: [
      {
        model: model.Position,
        as: 'positions',
        where: {
          timestamp: {
            $between: [begin, end]
          }
        }
      }
    ]
  }).then((tag) => {
    res.json(
      {
        tagId: tag.id,
        interval: {
          begin: begin,
          end: end
        },
        positions: tag.positions
      }
    )
  })
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
 *         {
 *           "labelId": 1,
 *           "labelName": "Label1",
 *         },
 *         {
 *           "labelId": 2,
 *           "labelName": "Label2",
 *         },
 *         {
 *           "labelId": 3,
 *           "labelName": "Label3",
 *         }
 *       ]
 *     }
 */
api.get('/labels', (req, res) => {
  model.Label.findAll().then((labels) => {
    res.json({labels: labels})
  })
})

/**
 * @api {delete} /map/:map_id/tag/:tag_id/label/:label_id Delete Label for Tag
 * @apiName DeleteTagLabel
 * @apiGroup Tag
 */
//TODO document and implement
api.delete('/map/:map_id/tag/:tag_id/label/:label_id', (req, res) => {
  res.json({tagId: req.params.tag_id, labelId: req.params.label_id, deleted: true})
})

/**
 * @api {post} /map/:map_id/tag/:tag_id/label Add Label for Tag
 * @apiName AddTagLabel
 * @apiGroup Tag
 */
//TODO document and implement
api.post('/map/:map_id/tag/:tag_id/label', (req, res) => {
  res.json({la: "dida"})
})

export default api
