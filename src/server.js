const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const dbConnection = require("./database");
const MongoStore = require("connect-mongo")(session);
require("./passport")(passport);
const app = express();
app.use(cors());
const PORT = 3000;
require("dotenv").config();

const space = require("./routes/space.js");
const user = require("./routes/user.js");
const doctor = require("./routes/doctor.js");

app.use(morgan("dev"));
app.use(
	//need to get the http request data
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(bodyParser.json()); // also need to get the http request body data
app.use(flash());

const appSession = session({
	secret: "fraggle-rock",
	store: new MongoStore({ mongooseConnection: dbConnection }),
	resave: false,
	saveUninitialized: false,
});

app.use(appSession);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

app.use("/space/",  space);
app.use("/user/",   user);
app.use("/doctor/", doctor);

exports.app = app;
// Starting Server

let socket = require("./socket");
socket.io.use((socket, next) => {
	appSession(socket.request, socket.request.res, next);
});

socket.server.listen(PORT, () => {
	console.log(`server listening on port: ${PORT}`);
});

//app.use(express.json());
