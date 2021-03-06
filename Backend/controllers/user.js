const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sanitize = require('mongo-sanitize');
// const CryptoJS = require("crypto-js");
const SECRET_KEY = process.env.SECRET_KEY;
const { User } = require('../models');
const EMAIL_ADMIN = process.env.ADMIN;

//ROUTES
const passwordValidator = require('../middlewares/password-validator')
let emailCrypted
// const emailCrypt = CryptoJS.SHA3(emailCrypted, process.env.CRYPT_KEY).toString()

exports.signup = (req, res, next) => {
	let admin
	if(req.body.email === EMAIL_ADMIN){
		admin = true
	  }else {
		admin = false
	  }

	const isValid = passwordValidator.validate(req.body.password);
    if (!isValid) {
        return res.status(400).json({ message: "Le mot de passe n'est pas valide" });
    }

	emailCrypted = req.body.email;

	if (req.body.email == null || req.body.username == null || req.body.password == null) {
		return (error => res.status(400).json({ error }))
	}
	
	let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
	if (!emailRegExp.test(req.body.email)) {	
		res.setHeader('Content-Type', 'application/json');
		res.status(400).json({ error: "Veuillez indiquer un email valide !" });
	} else {
	  bcrypt.hash(req.body.password, 10)
		.then(async hash =>  {  
		await User.create({
				username: req.body.username,
				email: emailCrypted,
				password: hash,
				bio: 'Je suis un utilisateur de Groupomania',
				photo: 'http://localhost:3000/images/icon.png1628338397125.png',
				isAdmin: admin
			})
			.then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
			.catch(error => res.status(400).json({ error: error }));
		})
		.catch((err) => {
			res.status(500).json({ error: "Impossible de créer l'utilisateur" });
		}		
		);
	  }
};

exports.login = (req, res, next) => {	

	emailCrypted = req.body.email;

	const mail = sanitize(emailCrypted)
	const password = sanitize(req.body.password);

	User.findOne({ raw: true, where: { email: mail }})
		.then( async user => {
			if (!user) {
				return res.status(401).json({ error: "Utilisateur non trouvé !" });
			}

			await bcrypt.compare(password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ error: "Mot de passe incorrect !" });
					}
					res.status(200).json({						
						id: user.id,
						username: user.username,
						email: user.email,
						photo: user.photo,
						token: jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "24h" }),
						isAdmin: user.isAdmin
					});
				})
				.catch(error => res.status(500).json({ error } ));
		})
		.catch(error => res.status(500).json({ error }));
};

exports.modifyUser = (req, res, next) => {
	const id = req.params.id;
	
	const modifyProfile = req.file ? {
		username: req.body.username,
		bio: req.body.bio,
		photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
	    } : {...req.body};

	User.update(modifyProfile, {
		raw: true, 
		where: { id: id } 
	})
	  .then(() => {
		res.status(201).json({ message: "Utilisateur mis à jour !" + id });
	  })
	  .catch(() => { 
		res.status(400).json({ message: "Operation impossible, veuillez réessayer ulterieurement." });
	  });	
  };

exports.deleteUser = (req, res, next) => {
	const id = req.params.id;

	User.destroy({raw: true, where: { id: id }})
	  .then(user => {
		if (user == 1) {
		  res.send({ message: "Utilisateur supprimé !" });
		} else { res.send({ message: "Impossible de supprimer l'utilisateur."})
		}
	  })
	  .catch(() => {
		res.status(500).send({ message: "Erreur lors de la suppression de l'utilisateur." + id});
	  });
};

exports.getOneUser = (req, res, next) => {
	const id = req.params.id;	
	User.findOne({where: {id: id}})
	  .then(user => { res.status(200).json(user)})
	  .catch(() => { res.status(500).send({ message: " Impossible de trouver l'utilisateur."});
	  });
}

exports.getAllUser = (req, res, next) => {
	User.findAll()
	    .then(users => { res.send(users) })
	    .catch(() => { res.status(500).send({ message: "Operation impossible, veuillez réessayer ulterieurement." });
	});
};