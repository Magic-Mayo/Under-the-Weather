const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/testo"
);

const userSeed = [
    {
        name: "Person 1",
        symptomHistory: [{
        symptomsValue: ["Abdominal guarding", "Abdominal pain", "Abdominal pain associated with menstruation"],
        createdAt: new Date(Date.now())
        }],
    },
    {
        name: "Person 2",
        symptomHistory: [{
        symptomsValue: ["Cough", "Cough with sputum", "Cramps"],
        createdAt: new Date(Date.now())
        }],
    }
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed ))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });