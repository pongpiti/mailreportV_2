var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var bcrypt = require("bcryptjs");
var mongo = require("mongodb");
var mongoose = require("mongoose");
var db = mongoose.connection;
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
//res user

app.get("*", function (req, res, next) {
  res.locals.users = req.user || null;
  next();
});

// app.use(require("connect-flash")());
// app.use(function (req, res, next) {
//   res.locals.messages = require("express-messages")(req, res);
//   next();
// });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('files'))
app.use(express.static(path.join(__dirname, "public")));


var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use((req, res,next)=>{
  res.status(404).render("404")
});



module.exports = app;
