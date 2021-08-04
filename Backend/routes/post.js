const express = require("express");
const router = express.Router();
// const auth = require("../middlewares/auth");
const postCtrl = require("../controllers/post");
const multer = require('../middlewares/multer-config');

router.get("/", postCtrl.getAllPost);

router.post("/", multer, postCtrl.createPost);

router.get("/:id", postCtrl.getOnePost);

router.put("/:id", multer, postCtrl.modifyPost);

router.delete("/:id", postCtrl.deletePost);

router.post('/:id/like', postCtrl.likePost)

module.exports = router;