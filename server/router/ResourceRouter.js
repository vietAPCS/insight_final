const router = require("express").Router();
const ResourceController = require("../controller/ResourceController");
const multer  = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
router.post("/addresource",upload.single('file'), ResourceController.addResource);

module.exports = router;