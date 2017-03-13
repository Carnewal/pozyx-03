import path from 'path'
import {Router} from 'express'
import model from '../model'
import multer from 'multer'

const api = Router()

api.get('/', (req, res) => {
  res.json({working: true})
})

/**
 * @api {get} /maps Request Maps
 * @apiName GetMaps
 * @apiGroup Map
 *
 * @apiSuccess {Object[]} maps Array of all maps
 * @apiSuccess {Integer} maps.mapId Map ID
 * @apiSuccess {String} maps.mapName Map name
 * @apiSuccess {String} maps.mapURL URL to image of the map
 * @apiSuccess {Number} maps.x Max distance in x direction
 * @apiSuccess {Number} maps.y Max distance in y direction
 * @apiSuccess {Number} maps.z Max distance in z direction
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "maps": [
 *         {
 *           "mapId": 1,
 *           "mapName": "Demo Map",
 *           "mapURL": "http://some.url.to.map.image.png",
 *           "x": 40,
 *           "y": 40,
 *           "z": 2
 *         }
 *       ]
 *     }
 */
api.get('/maps', (req, res) => {
  model.Map.findAll().then((maps) => {
    res.json(maps)
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
 *         "mapId": 1,
 *         "mapName": "Demo Map",
 *         "mapURL": "http://some.url.to.map.image.png",
 *         "x": 40,
 *         "y": 40,
 *         "z": 2
 *       }
 *     }
 */
api.get('/map/:id', (req, res) => {
  model.Map.findById(req.params.id).then((map) => {
    if (map) {
      res.json(map)
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

const upload = multer({
 storage: multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'server/public/maps/')
   },
   filename: function (req, file, cb) {
     cb(null, req.params.id + '.png')
   }
 }),
 fileFilter: (req, file, cb) => {
   if (file.mimetype !== 'image/png') {
     req.fileValidationError = 'Invalid filetype';
     return cb(null, false, new Error('Invalid Filetype'));
   }
   cb(null, true);
 }
})

api.post('/map/:id/image', upload.single('mapimage'), (req, res) => {
  const {file} = req
  if(req.fileValidationError) {
    return res.status(400).json({uploaded:false, error: req.fileValidationError})
  } else if (!file) {
    return res.status(400).json({uploaded:false, error: "Request form-data didn't contain a mapimage file."})
  }
  res.json({uploaded: true, mapURL: 'public/maps/' + file.filename});

})

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
 *           "tagId": 5,
 *           "tagName": "Maximus",
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
  //TODO Include labels
  model.Tag.findAll({
    where: {
      mapId: req.params.id
    }
  }).then((tags) => {
    res.json(tags)
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
api.get('/tag/:id', (req, res) => {
  // TODO Include labels
  model.Tag.findById(req.params.id).then((tag) => {
    res.json(tag)
  })
})

/**
 * @api {get} map/:map_id/tag/:tag_id/positions?begin=:begin&end=:end Request Positions
 * @apiName GetPositions
 * @apiGroup Tag
 *
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
api.get('map/:map_id/tag/:tag_id/positions', (req, res) => {
  // TODO Query for positions based on tag_id AND map_id (requires to join Posititions and Tags tables)
  // let query = {
  //   where: {
  //     mapId: req.params.id
  //   }
  //   include: [{
  //     model: model.Tag,
  //     where: {  }
  //   }]
  // }
  // model.Position.findAll(query).then()
  // req.query.begin
  // req.query.end //TODO
  // between: [new Date("2017-03-09T10:43:49"), new Date("2017-03-13T10:43:49")]
  res.json({
    "tagId": 12,
    "interval": {
      "begin": "2017-03-07T15:31:31.456",
      "end": "2017-03-07T16:31:31.456"
    },
    "positions": [
      {
        "x": 12.0000021,
        "y": 105.12555,
        "z": 0.04,
        "timestamp": "2017-03-07T16:31:20.456"
      },
      {
        "x": 13.678384,
        "y": 104.34592555,
        "z": 0.04,
        "timestamp": "2017-03-07T16:31:21.456"
      },
      {
        "x": 14.021,
        "y": 104.1232555,
        "z": 0.04,
        "timestamp": "2017-03-07T16:31:23.456"
      }
    ]
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
  // TODO implement
  res.json([
    {"labelId": 1, "labelName": "Label1",},
    {"labelId": 2, "labelName": "Label2",},
    {"labelId": 3, "labelName": "Label3",}
  ])
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

/**
 * @api {get} /anchors Request All Anchors
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
 *     }
 */
api.get('/anchors', (req, res) => {
  //TODO implement
  res.json([{id: 0, color: '4286f4', name: 'Maximus'}])
})

export default api
