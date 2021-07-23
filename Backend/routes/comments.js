const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const commentsCtrl = require("../controllers/comments");
const multer = require('../middlewares/multer-config');