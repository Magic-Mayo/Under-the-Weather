const express = require('express');
const app = express();
// const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
// const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require('passport');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

require('./routes/fbLogin')(app);
require('./routes/login')(app);
require('./routes/email')(app);
require('./routes/localLogin')(app);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/under-the-weather";
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, function() {
    console.log(`App listening on PORT: ${PORT}`);
});