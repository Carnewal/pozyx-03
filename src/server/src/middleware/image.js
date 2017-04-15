import multer from 'multer'

const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'server/public/maps/')
    },
    filename: function(req, file, cb) {
      cb(null, req.params.id + '.png')
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png') {
      req.fileValidationError = 'Invalid filetype'
      return cb(null, false, new Error('Invalid Filetype'))
    }
    cb(null, true)
  }
})

export default upload