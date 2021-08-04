const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const commentCtrl = require("../controllers/comments");
const multer = require('../middlewares/multer-config');

router.get("/", auth, commentCtrl.getAllComments);

router.post("/", auth, multer, commentCtrl.createComment);

// router.get("/:id", auth, commentCtrl.getOneComment);

router.put("/:id", auth, multer, commentCtrl.modifyComments);

router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;