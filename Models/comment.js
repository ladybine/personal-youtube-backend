const mongoose = require("mongoose");

const likesSchema = mongoose.Schema({
  numberLikes: { type: String, require: true },
});
const deslikesSchema = mongoose.Schema({
  numbersDislikes: { type: Number, require: true },
});
const subCommentSchema = mongoose.Schema(
  {
    commentaire: { type: String, require: true },
    userId: { type: String, require: true },
    likes: [likesSchema],
    deslikes: [deslikesSchema],
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
    likes: likesSchema,
    deslikes: deslikesSchema,
    subcomments: [subCommentSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comment", commentSchema);
