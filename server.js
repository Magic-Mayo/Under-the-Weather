const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require('path');
const routes = require('./routes');
const MongoStore = require('connect-mongo')(session);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/under-the-weather";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    // genid: (req) => {return genuuid()},
    key: 'under_weather',
    secret: "nothing to see here",
    resave: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    saveUninitialized: true,
    path: '/session'
}));



if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// app.use(session(req, res, next) => {
//     if (req.cookies.under_weather && !req.session.user) {
//         // res.clearCookie('under_weather');
//     }
//     next();
// });

require('./scripts/dbSeeds')(app);
require('./routes/userData')(app);
require('./routes/socialLogin')(app);
require('./routes/logout')(app);
require('./routes/email')(app);
require('./routes/account')(app);
require('./routes/localLogin')(app);


app.use(routes);

app.get('/googleb7dbc79786b470be.html',(req,res)=>{
    res.sendFile(path.join(__dirname, "./client/public/googleb7dbc79786b470be.html"));
});


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

app.listen(PORT, function() {
    console.log(`App listening on PORT: ${PORT}`);
});