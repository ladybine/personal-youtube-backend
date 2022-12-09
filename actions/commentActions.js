const modelComment = require("../Models/comment");

exports.postComment = (data, cb, cbError) => {
  const modelComments = new modelComment({ ...data });
  modelComments
    .save()
    .then((comment) => cb(comment))
    .catch((error) => cbError(error));
};

exports.getComment = (req, res, next) => {
  modelComment
    .find()
    .then((commentaires) => res.status(200).json({ commentaires }))
    .catch((error) => res.status(400).json({ error }));
};

exports.replyOneComment = (data, cb, cbError) => {
  modelComment
    .findOne({ _id: data.commentId })
    .then((UnCommentaire) => {
      UnCommentaire.subcomments.push({ commentaire: data.commentaire });
      return UnCommentaire.save().then((comment) => cb(comment));

      /* res.status(200).json({ UnCommentaire } */
    })
    .catch((error) => cbError(error));
};
exports.postLikes = (data, cb, cbError) => {
  /* modelComment */
    /* .findOne({ _id: data.commentId })
    .then((oneLike) => {
      console.log("oneLike", oneLike);
      oneLike.likes.numberLikes= data.likes += 1 },
      oneLike.save().then((like) => cb(like))
    }).catch((error) => cbError(error)); */
 }
