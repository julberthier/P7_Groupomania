const fs = require('fs');
const { Post } = require('../models');
const { Comment } = require('../models');

exports.createComment = async (req, res, next) => {
    const commentaire = {
        ...req.body
      };

      await Comment.create(commentaire)
        .then(comment => { res.send(comment) })
        .catch((err) => { 
          res.status(500);
          console.log(err);
        });    
}

exports.deleteComment = (req, res, next) => {
	const id = req.params.id;

	Comment.destroy({raw: true, where: { id: id }})
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
  Comment.findAll()
    .then(comments => { res.send(comments) })
    .catch((err) => { 
      console.log(err);
      res.status(500).send({ message: "Operation impossible, veuillez réessayer ulterieurement." });
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
      
    Comment.update(modifyComments, {raw: true, where: { id: id }})
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

// exports.getOneCommentList = (req, res, next) => {
// Comment.findOne({ raw:True })

// }