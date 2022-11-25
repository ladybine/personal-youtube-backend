const mongoose = require("mongoose");

const subCommentSchema = mongoose.Schema(
  {
    commentaire: { type: String, require: true },
    likes: [String],
    deslikes: [String],
  },
  {
    timestamps: true,
  }
);

const commentSchema = mongoose.Schema(
  {
    commentaire: { type: String, require: true },
    videoId: { type: String, require: true },
    likes: [String],
    deslikes: [String],
    subcomments: [subCommentSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comment", commentSchema);
