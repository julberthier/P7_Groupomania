const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const postCtrl = require("../controllers/post");
const multer = require('../middlewares/multer-config');

//Route pour recuperer toutes les sauces
router.get("/", auth, postCtrl.getAllPost);

//Route pour creer une sauce
router.post("/", auth, multer, postCtrl.createPost);

//Route pour recuperer une sauce
router.get("/:id", auth, postCtrl.getOnePost);

//Route pour modifier une sauce
router.put("/:id", auth, multer, postCtrl.modifyPost);

//Route pour supprimer une sauce
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;