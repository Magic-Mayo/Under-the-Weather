const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(session({ secret: "nothing to see here" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/passport')(app);
require('./routes/account')(app);
require('./routes/fbLogin')(app);

if (process.env.NODE_ENV ==='production'){
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/under-the-weather";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err=>console.log(err));

app.listen(PORT, function() {
    console.log(`App listening on PORT: ${PORT}`);
});