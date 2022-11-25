const controllerComment = require("../Controllers/controllerComment");
const express = require("express");
const router = express.Router();

router.get("/", controllerComment.getComment);
router.post("/comment", controllerComment.postComment);
router.put("/", controllerComment.getOneComment)
module.exports = router;
