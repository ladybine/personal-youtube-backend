const modelComment = require("../Models/comment");
const commentActions = require("../actions/commentActions");

exports.postComment = (req, res, next) => {
  commentActions.postComment(
    { ...req.body },
    (data) => {
      res.status(201).json({ message: "commentaire laisser" });
    },
    (error) => {
      res.status(400).json({ error });
    }
  );
};

exports.getComment = (req, res, next) => {
  modelComment
    .find()
    .then((commentaires) => res.status(200).json({ commentaires }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneComment = (req, res, next) => {
  modelComment
    .findOne({ _id: req.body.id })
    .then((UnCommentaire) => {
      console.log(UnCommentaire.subcomments);
      UnCommentaire.subcomments.push({ commentaire: req.body.commentaire });
      return UnCommentaire.save().then(() =>
        res.status(201).json({ message: "un sous-commentaire laisser" })
      );

      /* res.status(200).json({ UnCommentaire } */
    })
    .catch((error) => res.status(400).json({ error }));
};
