const modeleUsers = require("../Models/user");

exports.registerUser = (req, res, next) => {
  const { id, img, name, firstName } = req.body;
  console.log(req.body);
  modeleUsers
    .create({
      gapi_id: `${id}`,
      nom: name,
      prenom: firstName,
      image: img,
    })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => res.status(400).json({ error }));
};
exports.getUser = (req, res, next) => {
  modeleUsers
    .find()
    .then((utilisateur) => res.status(200).json({ utilisateur }))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateUser=(req, res, next)=>{
   const { id, img, name, firstName } = req.body;
   if (!req.body) {
     return res
       .status(400)
       .send({ message: "Data to update can not be empty" });
   }
    modeleUsers
      .findOneAndUpdate(
        {
          gapi_id: id,
          nom: name,
          prenom:firstName,
          image:img,
          lien_facebook: facebook,
          lien_instagram: instagram,
         
        },
        { new: true, returnOriginal: false }
      )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Can not update user with.May be user not found `,
          });
        } else {
          res.status(200).send(data);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
}
