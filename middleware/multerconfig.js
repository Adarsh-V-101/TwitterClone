const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function(errm , bytes){
      const fn = bytes .toString('hex') + path.extname(file.originalname)
      cb(null, fn);
    })
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


// filter file

const fileFilter = (req, file, cb) =>{
  const filetype = /jpeg|jpg|png/
  const ext = filetype.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetype.test(file.mimetype)
  cb(null, ext && mimetype);
}

module.exports = multer({storage, fileFilter})