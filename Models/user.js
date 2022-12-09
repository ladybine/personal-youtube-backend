const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  gapi_id: { type: String, require: true, unique: true },
  nom: { type: String, require: true },
  prenom: { type: String, require: true },
  lien_facebook: { type: String, default: "https://www.facebook.com" },
  lien_instagram: { type: String, default: "https://www.istagram.com" },
  image: { type: String, require: true },
});

module.exports = mongoose.model("User", userSchema);
