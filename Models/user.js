const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  nom: { type: String, require: true },
  prenom: { type: String, require: true },
  lien_facebook: { type: String, require: false },
  lien_instagram: { type: String, require: false },
});

module.exports = mongoose.model("user", userSchema);
