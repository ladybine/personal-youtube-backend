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
    (comment) => {
      res.json({
        message: "un like a été ajouter",
        count: comment.likes.length,
        liked: comment.likes.includes(req.body.userId),
      });
    },
    (error) => {
      res.status(400).json({ error });
    }
  );
};
exports.postDeslikes = (req, res, next) => {
  commentActions.postDisLikes(
    { ...req.body },
    (comment) => {
      res.json({
        message: "un dislike a été ajouter",
        count: comment.dislikes.length,
        disliked: comment.dislikes.includes(req.body.userId),
      });
    },
    (error) => {
      res.status(400).json({ error });
    }
  );
};
exports.postSubCommentLike = (req, res, next) => {
  commentActions.postSubCommentLike(
    { ...req.body },
    (comment) => {
      res.json({
        message: "un like de souscommentaire a été ajouter",
        count: comment.likes.length,
        liked: comment.likes.includes(req.body.userId),
      });
    },
    (error) => {
      res.status(400).json({ error });
    }
  );
};

exports.postSubCommentDislike=(req,res, next)=>{
  commentActions.postSubCommentDislike(
    { ...req.body },
    (comment) => {
      res.json({
        message: "un dislike de souscommentaire a été ajouter",
        count: comment.dislikes.length,
        disliked: comment.dislikes.includes(req.body.userId),
      });
    },
    (error) => {
      res.status(400).json({ error });
    }
  );
}
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
