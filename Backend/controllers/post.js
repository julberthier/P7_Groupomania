const fs = require('fs');
const { Post } = require('../models/post');
const { User } = require('../models');


exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
	delete postObject._id;
    const post = {        
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId,
      attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    };
    Post.create(post)
        .then( res.send(post),
        res.status(201).json({ message: "Publication mise en ligne !" })
        )
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
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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
            const filename = post.imageUrl.split('/images/')[1];
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
    Posts.findAll({
        include: [{model: User}],
        order: [['updatedAt', "DESC"], ['createdAt', "DESC"]] 
    })
        .then(post => { res.send(post) })
        .catch(error => { res.status(400).json({ error: error });
    });
};