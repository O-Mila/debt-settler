const mongoose = require("mongoose"),
express 	   = require("express"),
bodyParser 	   = require("body-parser"),
app 		   = express(),
cors		   = require('cors'),
passport	   = require("passport"),
LocalStrategy  = require("passport-local"),
session 	   = require('express-session'),
path 		   = require("path");

require("dotenv").config()

const secret = process.env.SECRET || "Spengler Uber Alles",
PORT = process.env.PORT || 8080,
url = process.env.DATABASEURL || "mongodb+srv://Oriol:0112-omj-8986@cluster0-8kwdj.mongodb.net/debt-settler?retryWrites=true";

mongoose.connect(url, { useNewUrlParser: true });

const Group = require('./database/models/group');
const User = require('./database/models/user');
const Item = require('./database/models/item');

// Configure body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure session authentication
app.use(session({
	secret: secret,
	resave: false,
	saveUninitialized: false
}));

// Console.log req.session
app.use( (req, res, next) => {
  return next();
});

// Passport and session initializing
app.use(passport.initialize());
app.use(passport.session());

// Local Strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Info about whether the user logged in (it's passed to the template through "res.locals")
app.use((req, res, next) => {
   res.locals.currentUser = req.user;
   next();
});

// Allow Cross-Origin-Resource-Sharing
app.use(cors());

// Look for files in client folder
app.use(express.static(path.join(__dirname, "client", "build")))

// Configure routing
const userRoutes = require('./routes/users');
const groupRoutes = require('./routes/groups');
const itemRoutes = require('./routes/items');
const transferRoutes = require('./routes/transfers');

app.use('/api', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/groups/:group_id/items', itemRoutes);
app.use('/api/groups/:group_id/transfers', transferRoutes);

// Sends index.html to the client
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Launch our server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));