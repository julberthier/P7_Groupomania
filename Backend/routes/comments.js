const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const commentCtrl = require("../controllers/comments");
const multer = require('../middlewares/multer-config');

router.get("/", commentCtrl.getAllComments);

router.post("/", multer, commentCtrl.createComment);

// router.get("/:id", auth, commentCtrl.getOneComment);

router.put("/:id", multer, commentCtrl.modifyComments);

router.delete("/:id", commentCtrl.deleteComment);

module.exports = router;