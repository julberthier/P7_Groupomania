const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, SECRET_KEY);
		const id = decodedToken.id;
		if (req.body.id && req.body.id !== id) {
			throw "User ID non valable !";
		} else {
			next();
		}
	} catch (error) {
		res.status(401).json({ error: error | "requete non authentifiée !" });
	}
};
