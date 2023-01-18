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
      UnCommentaire.subcomments.push({
        commentaire: data.commentaire,
        userId: data.userId,
      });
      return UnCommentaire.save().then((comment) => cb(comment));

      /* res.status(200).json({ UnCommentaire } */
    })
    .catch((error) => cbError(error));
};
exports.postLikes = (data, cb, cbError) => {
  modelComment
    .findOne({ _id: data.commentId })
    .then((comment) => {
      console.log(comment.likes);
      if (!comment.likes.includes(data.userId)) {
        comment.likes.push(data.userId);
      } else {
        comment.likes = comment.likes.filter((id) => id !== data.userId);
      }
      comment.save().then((_comment) => cb(_comment));
    })
    .catch((error) => {
      console.log(error);
      cbError(error);
    });
};

exports.postDisLikes = (data, cb, cbError) => {
  console.log(data);
  modelComment
    .findOne({ _id: data.commentId })
    .then((comment) => {
      if (!comment.dislikes.includes(data.userId)) {
        comment.dislikes.push(data.userId);
      } else {
        comment.dislikes = comment.dislikes.filter((id) => id !== data.userId);
      }
      comment.save().then((commentdis) => cb(commentdis));
    })
    .catch((error) => cbError(error));
};

exports.postSubCommentLike = (data, cb, cbError) => {
  modelComment
    .findOne({ _id: data.commentId })
    .then((comment) => {
      const subcomment = comment.subcomments.find(
        (sub) => sub._id === data.subCommentId
      );
      comment.subcomments.map((s) => console.log(s._id === data.subCommentId));
      const subcommentIndex = comment.subcomments.findIndex(
        (sub) => sub._id === data.subCommentId
      );
      
      if (!subcomment.likes.includes(data.userId)) {
        subcomment.likes.push(data.userId);
      } else {
        subcomment.likes = subcomment.likes.filter((id) => id !== data.userId);
      }
      console.log(subcomment.likes, subcommentIndex);
      comment.likes.splice(subcommentIndex, 1, subcomment);
      comment.save().then((_comment) => {
        const newSubcomment = comment.subcomments.find(
          (sub) => sub._id === data.subCommentId
        );
        cb(newSubcomment);
      });
    })
    .catch((error) => {
      console.log(error);
      cbError(error);
    });
};
exports.postSubCommentDislike = (data, cb, cbError) => {
  modelComment
    .findOne({ _id: data.commentId })
    .then((comment) => {
      const subcomment = comment.subcomments.find(
        (sub) => sub._id === data.subCommentId
      );
      comment.subcomments.map((s) => console.log(s._id === data.subCommentId));
      const subcommentIndex = comment.subcomments.findIndex(
        (sub) => sub._id === data.subCommentId
      );
      if (!subcomment.dislikes.includes(data.userId)) {
        subcomment.dislikes.push(data.userId);
      } else {
        subcomment.dislikes = subcomment.dislikes.filter(
          (id) => id !== data.userId
        );
      }
      console.log(subcomment.dislikes, subcommentIndex);
      comment.dislikes.splice(subcommentIndex, 1, subcomment);
      comment.save().then((_comment) => {
        const newSubcomment = comment.subcomments.find(
          (sub) => sub._id === data.subCommentId
        );
        cb(newSubcomment);
      });
    })
    .catch((error) => {
      console.log(error);
      cbError(error);
    });
};
