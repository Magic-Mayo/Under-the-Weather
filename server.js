const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require('passport');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/apiRoutes')(app);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/under-the-weather";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, function() {
    console.log(`App listening on PORT: ${PORT}`);
});