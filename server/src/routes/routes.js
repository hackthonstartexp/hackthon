const express = require('express')
const imageCaptionController = require('../controllers/image-caption-controller');

const routes = express.Router()
routes.get("/api/mj/caption", imageCaptionController.captionImage);
routes.post("/api/mj/caption", imageCaptionController.captionImage);
routes.get("/api/mj/gen", imageCaptionController.generate);

module.exports = routes
