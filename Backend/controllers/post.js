const fs = require('fs');
var { Post } = require('../models');
const { User } = require('../models');

exports.createPost = async (req, res, next) => {

    const postObject = JSON.parse(JSON.stringify(req.body));
    console.log(postObject);
    
    let articles

    if (req.file !== undefined || '') {    
        articles = {   
        ...postObject,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        }
    } else {
        articles = { 
        ...req.body,
        }
    }

    await Post.create(articles)
        .then(()=> res.status(201).json({ message: 'Message créé !' }))
        .catch((err) => {
            res.status(500); 
            console.log(err)
        })
};  


exports.getOnePost = (req, res, next) => {
    Post.findOne({ raw: true, where: { id: req.params.id }})
		.then((post) => { res.status(200).json(post) })
		.catch(error => { res.status(404).json({ error: error });
		});	
};

exports.modifyPost = (req, res, next) => {
    const postObject =  req.file? 
    // ? =>  Operateur ternaire pour savoir si req.file existe.
    { 
        ...JSON.parse(req.body.post),
        attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body}
    Post.updateOne({ id: req.params.id }, { ...postObject, id: req.params.id })
        .then(() => {
            res.status(201).json({ message: "Publication mise à jour !" })
        })
        .catch(error => { res.status(400).json({ error: error });
        });
};

exports.deletePost = (req, res, next) => {
    const id = req.params.id;

   Post.destroy({raw: true, where: { id: id }}) 
        .then(post => {
            if (Post.image !== null ) {
                const filename = post.image.split('/images/')[1];
                fs.unlink(`images/${filename}`);   
            }          
            res.status(200).json({message: "Publication supprimée !"});
            })
            .catch(error => res.status(400).json({ message:"c'est l'erreur" }));
}

exports.getAllPost = (req, res, next) => {
    Post.findAll()
        .then(posts => {
            res.send(posts)
         })
        .catch(error => {             
        res.status(400).json({ error: error });
    });
};

exports.likePost = (req, res, next) => {

	const Id = req.body.id;
	const numberLikes = req.body.like;
	
	Post.findOne({ _id: req.params.id })
    .then(post => {
        switch(numberLikes) {
            case +1:
                Post.updateOne({_id: req.params.id}, { $push: {usersLiked: Id}, $inc: {likes: +1}
				})
            .then(() => res.status(200).json({ message: "J'aime la publication !" }))
            .catch(error => res.status(400).json({ error }));
            break;

            case -1:
                Post.updateOne({_id: req.params.id}, { $push: {usersDisliked: Id}, $inc: {dislikes: +1}
				})
            .then(() => res.status(200).json({ message: "Je n'aime pas la publication !"}))
            .catch(error => res.status(400).json({ error }));
            break;

            case 0:				
				let promise;
				if (post.usersLiked.find((element) => element === Id)) {
					promise = Post.updateOne({_id: req.params.id}, { $pull: {usersLiked: Id}, $inc: {likes: -1}})			
				} else {
					promise = Post.updateOne({_id: req.params.id}, { $pull: {usersDisliked: Id}, $inc: {dislikes: -1}})
				} 
				promise               
					.then(() => res.status(200).json({ message: "Avis mis à jour !"}))
					.catch(error => res.status(400).json({ error }));
					break;
        }
    })
	.catch(error => res.status(400).json({ error: error }))
};