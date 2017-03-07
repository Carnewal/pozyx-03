import express from 'express'

const api = new express()

api.get('/', (req, res, next) => {
  res.json({ working: true })
})



/**
 * @api {get} /tag Request All Tags
 * @apiName GetTags
 * @apiGroup Tag
 *
 * @apiSuccess {Object[]} tags Array of all tags
 * @apiSuccess {Integer} tags.tagId The unique tag id
 * @apiSuccess {String} tags.tagName The tag name
 * @apiSuccess {Integer} tags.mapId Id of the map this tag exists on
 * @apiSuccess {Integer} tags.hardwareVersion The tag's hardware version
 * @apiSuccess {Integer} tags.firmwareVersion The tag's firmware version
 * @apiSuccess {Number} tags.updateRate The tag's update rate
 * @apiSuccess {Integer} tags.iconNumber The tag's icon number
 * @apiSuccess {String} tags.iconColor The tag's icon hex color
 * @apiSuccess {Object} tags.position The tag's position object
 * @apiSuccess {Number} tags.position.x The tag's position x-coord
 * @apiSuccess {Number} tags.position.y The tag's position y-coord
 * @apiSuccess {Number} tags.position.z The tag's position z-coord
 */
api.get('/tag', (req, res, next) => {
  res.json([{ id: 0, color: '4286f4', name: 'Maximus' }])
})

/**
 * @api {get} /anchor Request Tag History
 * @apiName GetTagHistory
 * @apiGroup Tag
 */
api.get('/tag/history', (req, res, next) => {
  res.json([{ id: 0, color: '4286f4', name: 'Maximus' }])
})

/**
 * @api {get} /anchor Delete Label for Tag
 * @apiName DeleteTagLabel
 * @apiGroup Tag
 */
api.delete('/tag/:id/label', (req, res, next) => {
  res.json({ tagId: req.params.id, labelId: req.params.labelid, deleted: true })
})

/**
 * @api {get} /anchor Request All Anchors
 * @apiName GetAnchors
 * @apiGroup Anchor
 *
 * @apiSuccess {Object[]} anchor Array of all anchors
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
 */
api.get('/anchor', (req, res, next) => {
  res.json([{ id: 0, color: '4286f4', name: 'Maximus' }])
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
api.get('/tag/:id', (req, res, next) => {
  res.json({ id: req.params.id, color: '4286f4', name: 'Maximus' })
})

export default api
