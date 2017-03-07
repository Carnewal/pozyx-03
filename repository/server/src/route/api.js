import express from 'express'

const api = new express()

api.get('/', (req, res, next) => {
  res.json({ working: true })
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
