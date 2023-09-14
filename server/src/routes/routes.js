const express = require('express')
const imageCaptionController = require('../controllers/image-caption-controller');

const routes = express.Router()
routes.get("/api/caption", imageCaptionController.captionImage);
routes.post("/api/caption", imageCaptionController.captionImage);

module.exports = routes
