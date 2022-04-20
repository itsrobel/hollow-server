const express = require("express");
const router = express.Router();
const User = require("../database/models/user");
const passport = require("passport");
const VALIDATION = require("../utils/validation");
router.post("/create", (req, res) => {
	console.log("user signup");

	const { 
		username, 
		email,
		age, 
		password, 
		confirmPassword 
	} = req.body;

	if (!username)						VALIDATION(100, res);
	if (!email) 						VALIDATION(100, res);
	if (!password) 						VALIDATION(100, res);
	if (!confirmPassword) 				VALIDATION(100, res);

	if (password !== confirmPassword) 	VALIDATION(200, res);
	if (password.length < 6) 			VALIDATION(300, res);
	User.findOne({

	  $or: [{ email }, { username }],
	}).then((user) => {
		if (user) {
			if (user.email === email) 			VALIDATION(400, res);
			if (user.username === username) 	VALIDATION(500, res);
		}	
	});
	const newUser = new User({
		username,
		email,
		password,
		age, 
	})
	newUser.save(((err , savedUser) => {
		if (err) return res.json(err);
		res.json({ success: true, user: savedUser})
	}));
});

router.post("/login", (req, res, next) => {
  	passport.authenticate("local", (e, user, info) => {
		if (info) {
	  		console.log(`Error: ${info.message}`);
	  		return res.send({ success:false, error : { msg: info.message } });
		} else {
			req.login(user, (err) => {
			if (err) return next(err);
				console.log(user);
	  		});
			res.send({success: true, user: user});
		}
  	})(req, res, next);
});
// will login user in if already pass authentication
router.get("/", (req, res, next) => {
	console.log("===== user!!======");
	console.log(req.user);
	if (req.user) {
		res.json({ success: true, user: req.user });
	} else {
		res.json({ success:false, error: { msg:"no user"}});
	}
});

// returns all active users - get rid of this in post production
// or atleast lock it behind a password
router.get("/list", (req, res) => {
	User.find({}, "username" , ).then((data) => {
		res.json(data);
	});
});
// deletes user by given http req param id - again get rid of this in post or lock it

// logs user out of the express / passport session
router.post("/logout", (req, res) => {
	if (req.user) {
		req.logout();
		res.send({ success:true, msg: "logging out" });
	} else {
		res.send({ success:false, msg: "no user to log out" });
	}
});

router.delete("/:id", (req, res) => {
	User.findByIdAndDelete(req.params.id)
	.then(() => {
		res.json("deleted user");
	})
	.catch((err) => {
		res.json(`Error: ${err}`);
	});
});
module.exports = router;
