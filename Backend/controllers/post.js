const fs = require('fs');
const { Post } = require('../models');

exports.createPost = (req, res, next) => {

    // const postObject = JSON.parse(req.body);
	// delete postObject._id;
    // console.log(postObject);

    const post = new Post ({        
      title: req.body.title,
      content: req.body.content,
      id: req.body.id,
      attachment: `${req.protocol}://${req.get('host')}/images/${req.file.name}`,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: [],
    });    
    
    Post.create(post)
        .then(() => res.status(201).json({ message: "Publication mise en ligne !" }))
        .catch(() => res.status(500).json({ message : " Impossible de publier le post ! "}))
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
        attachment: `${req.protocol}://${req.get('host')}/assets/images/${req.file.filename}`
    } : { ...req.body}
    Post.updateOne({ id: req.params.id }, { ...postObject, id: req.params.id })
        .then(() => {
            res.status(201).json({ message: "Publication mise à jour !" })
        })
        .catch(error => { res.status(400).json({ error: error });
        });
}

exports.deletePost = (req, res, next) => {
    Post.findOne({ id: req.params.id })    
        .then(post => {
            const filename = post.attachment.split('/images/')[1];
            fs.unlink(`images/${filename}`, () =>{
                Post.deleteOne({ id: req.params.id })
                    .then(() => {
                        res.status(200).json({message: "Publication supprimée !"});
                    })
                    .catch(error => res.status(400).json({ error: error }));
            })
        })
        .catch(error => res.status(500).json({ error: error }));
    }

exports.getAllPost = (req, res, next) => {
    Post.findAll()
        .then(post => { res.status(200).json(post) })
        .catch(error => { res.status(400).json({ error: error });
    });
};

exports.likePost = (req, res, next) => {

	const userId = req.body.id;
	const numberLikes = req.body.like;
	
	Post.findOne({ _id: req.params.id })
    .then(post => {
        switch(numberLikes) {
            case +1:
                Post.updateOne({_id: req.params.id}, { $push: {usersLiked: userId}, $inc: {likes: +1}
				})
            .then(() => res.status(200).json({ message: "J'aime la publication !" }))
            .catch(error => res.status(400).json({ error }));
            break;

            case -1:
                Post.updateOne({_id: req.params.id}, { $push: {usersDisliked: userId}, $inc: {dislikes: +1}
				})
            .then(() => res.status(200).json({ message: "Je n'aime pas la publication !"}))
            .catch(error => res.status(400).json({ error }));
            break;

            case 0:				
				let promise;
				if (post.usersLiked.find((element) => element === userId)) {
					promise = Post.updateOne({_id: req.params.id}, { $pull: {usersLiked: userId}, $inc: {likes: -1}})			
				} else {
					promise = Post.updateOne({_id: req.params.id}, { $pull: {usersDisliked: userId}, $inc: {dislikes: -1}})
				} 
				promise               
					.then(() => res.status(200).json({ message: "Avis mis à jour !"}))
					.catch(error => res.status(400).json({ error }));
					break;
        }
    })
	.catch(error => res.status(400).json({ error: error }))
}