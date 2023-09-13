const express = require('express')
const imageCaptionController = require('../controllers/image-caption-controller');

const routes = express.Router()
routes.get("/api/one", imageCaptionController.captionImage);

module.exports = routes
