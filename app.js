const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");
const passportInit = require('./Passport/passportInit'); // Adjust the path as necessary
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");

require("dotenv").config();
require("express-async-errors");


const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.set("view engine", "ejs");
app.set("views", "Views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(xss());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  //deprecated
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB Connected");
});

app.use(express.urlencoded({ extended: false }));

// Session setup with MongoDBStore
const store = new MongoDBStore({
  uri: mongoURI,
  collection: "mySessions",
});
store.on("error", function (error) {
  console.log("Session Store Error:", error);
});

const sessionParams = {
  secret: process.env.SESSION_SECRET,
  //these seem to have an impact on how the page renders
  resave: true,
  saveUninitialized: true,
  store: store,
  cookie: { secure: false, sameSite: "strict" },
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  sessionParams.cookie.secure = true;
}

app.use(session(sessionParams));
app.use(flash());

// Passport initialization
passportInit();
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./Middleware/storeLocals"));


app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.info = req.flash("info");
  res.locals.errors = req.flash("error");
  next();
});

app.get('/', (req, res) => {
  res.render('index'); 
});

// Routes
const userRoutes = require("./Routes/userRoutes");
const poemRoutes = require("./Routes/poemRoutes");
app.use("/users", userRoutes);
app.use("/poems", poemRoutes);

// Default route for handling 404 errors
app.use((req, res) => {
  res.status(404).send(`That page (${req.url}) was not found.`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
  console.error(err);
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
