const controllerComment = require("../Controllers/controllerComment");
const express = require("express");
const router = express.Router();

router.get("/", controllerComment.getComment);
router.post("/comment", controllerComment.postComment);
router.post("/like", controllerComment.postLikes);
router.post("/dislike", controllerComment.postDeslikes);
router.post("/sublike", controllerComment.postSubCommentLike);
router.post("/subdislike", controllerComment.postSubCommentDislike);
router.put("/", controllerComment.getOneComment);
module.exports = router;
