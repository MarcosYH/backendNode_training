const Thing = require("../models/Thing");
const fs = require('fs');

// function for create things
exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  delete thingObject._userId;
  const thing = new Thing({
    ...thingObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  
  thing.save()
   .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
   .catch(error => { res.status(400).json( { error })})

  // delete req.body._id;
  // const thing = new Thing({
  //   ...req.body,
  // });
  // thing
  //   .save()
  //   .then((thing) =>
  //     res.status(201).json({ message: "Objet enregistré !", thing })
  //   )
  //   .catch((error) => res.status(400).json({ error }));
};

// function for get one things
exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

// function for put one things
exports.putOneThing = (req, res, next) => {
  const thingObject = req.file ? {
    ...JSON.parse(req.body.thing),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body};
  
  delete thingObject._userId;
   Thing.findOne({_id: req.params.id})
       .then((thing) => {
           if (thing.userId != req.auth.userId) {
               res.status(401).json({ message : 'Not authorized'});
           } else {
               Thing.updateOne({ _id: req.params.id}, { ...thingObject, _id: req.params.id})
               .then(() => res.status(200).json({message : 'Objet modifié!'}))
               .catch(error => res.status(401).json({ error }));
           }
       })
       .catch((error) => {
           res.status(400).json({ error });
       });

  // Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  //   .then(() => res.status(200).json({ message: "Objet modifié !" }))
  //   .catch((error) => res.status(400).json({ error }));
};
// function for delete one things
exports.deleteOneThing = (req, res, next) => {

  Thing.findOne({ _id: req.params.id})
  .then(thing => {
      if (thing.userId != req.auth.userId) {
          res.status(401).json({message: 'Not authorized'});
      } else {
          const filename = thing.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
              Thing.deleteOne({_id: req.params.id})
                  .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                  .catch(error => res.status(401).json({ error }));
          });
      }
  })
  .catch( error => {
      res.status(500).json({ error });
  });
  
    // Thing.deleteOne({ _id: req.params.id })
    // .then(() => res.status(200).json({ message: "objet supprimé" }))
    // .catch((error) => res.status(400).json({ error }));
};
// function for get all things
exports.getAllThing =(req, res, next) => {
    Thing.find()
      .then((things) => res.status(200).json(things))
      .catch((error) => res.status(400).json({ error }));
  }