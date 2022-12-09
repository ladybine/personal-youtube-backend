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

exports.postLikes = (req, res, next) => {
  console.log(req.body);
  commentActions.postLikes(
    { ...req.body },
    (data) => {
      res.status(200).json({ message: "un like a été ajouter" });
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
  commentActions.replyOneComment(
    { ...req.body },
    (data) => {
      res.status(200).json({ message: "un sous commentaire laisser" });
    },
    (error) => {
      res.status(400).json({ error });
    }
  );
};
