const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const routeComment = require("./Routes/routeComment");
const commentActions = require("./actions/commentActions");
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
  },
});

mongoose
  .connect(
    "mongodb+srv://barbine:barbine_iduma@cluster0.omjnknn.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());
app.use(cors());
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("comment-send", (data) => {
    commentActions.postComment(
      data,
      (data) => {
        console.log("data", data);
        socketIO.emit("comment-send", data);
      },
      (error) => {}
    );
  });

  socket.on("comment-reply", (data) => {
    commentActions.replyOneComment(
      data,
      (data) => {
        console.log("data-reply", data);
        socketIO.emit("comment-reply", data);
      },
      (error) => {
        console.log("data-error", error);
      }
    );
  });
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});
app.use("/comments", routeComment);
http.listen("3000", console.log("le serveur est lancé"));
