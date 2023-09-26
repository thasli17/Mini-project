const multer = require('multer')

const multerStorage = require('../storage/multer')

module.exports = {
    uploadProductImg : multer({
        storage: multerStorage.productStorage
    }),
    bannerUpload : multer ({
        storage : multerStorage.bannerStorage
    })
  
}
