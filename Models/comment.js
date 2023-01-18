const mongoose = require("mongoose");

const subCommentSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: new mongoose.Types.ObjectId().toHexString(),
    },
    commentaire: { type: String, require: true },
    userId: { type: String, require: true },
    likes: [String],
    dislikes: [String],
  },
  {
    timestamps: true,
  }
);

const commentSchema = mongoose.Schema(
  {
    commentaire: { type: String, require: true },
    videoId: { type: String, require: true },
    userId: { type: String, require: true },
    likes: [String],
    dislikes: [String],
    subcomments: [subCommentSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comment", commentSchema);
