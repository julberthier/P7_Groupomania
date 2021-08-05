const fs = require('fs');
const { Post } = require('../models');
const { Comments } = require('../models');

exports.createComment = (req, res, next) => {
    const commentaire = {
        content: req.body.content,
        articleId: Post.id,
        idUSERS: req.body.id,
      };
      Comments.create(commentaire)
        .then(comment => { res.send(comment) })
        .catch(() => { res.status(500).json({ message: "Une erreur s'est produite lors de la création du commentaire "});
        });    
}

exports.deleteComment = (req, res, next) => {
	const id = req.params.id;

	Comments.destroy({raw: true, where: { id: id }})
	  .then(comment => {
		if (comment == 1) {
		  res.send({ message: "Commentaire supprimé !" });
		} else { res.send({ message: "Impossible de supprimer le commentaire." })
		}
	  })
	  .catch(err => {
		res.status(500).send({ message: "Erreur lors de la suppression du commentaire." });
	  });
}

exports.getAllComments = (req, res, next) => {
  Comments.findAll()
    .then(comments => { res.send(comments) })
    .catch(() => { res.status(500).send({ message: "Operation impossible, veuillez réessayer ulterieurement." });
});
}

exports.modifyComments = (req, res, next) => {
    const id = req.params.id;

    const modifyComments = req.file ? {
        content: req.body.content,
        articleId: Post.id,
        idUSERS: req.body.id,
    } : {  
        content: req.body.content,
        articleId: Post.id,
        idUSERS: req.body.id,
    }
      
    Comments.update(modifyComments, {raw: true, where: { id: id }})
      .then(modify => {
        if (modify == 1) { res.send({ message: "Le commentaire a été modifié" })} 
        else { res.send({ message: "Impossible de modifier le commentaire."
        });
        }
      })
      .catch(() => {
        res.status(500).send({ message: "Operation impossible, veuillez réessayer ulterieurement." });
      });
}