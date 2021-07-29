const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const rateLimit = require("express-rate-limit");

const createAccountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour window
	max: 100000000000000000000000000000000000000000000000000000000000000000000000000, // start blocking after 10 requests
	message:
		"Trop de comptes crées à partir de cette adresse IP, veuillez essayer ulterieurement",
});

router.post('/signup', createAccountLimiter, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/modify', createAccountLimiter, userCtrl.modifyUser)
router.delete('/delete', userCtrl.deleteUser)
router.get('/user:id', userCtrl.getOneUser)
router.get('/users', userCtrl.getAllUser)

module.exports = router;
