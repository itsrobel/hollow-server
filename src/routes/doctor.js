const express = require("express");
const router = express.Router();
const Doctor = require("../database/models/doctor");
const passport = require("passport");
const VALIDATION = require("../utils/validation");
router.post("/", (req, res) => {
	console.log("doctor signup");

	const { 
		firstName,
		lastName,
		email,
		age,
		gender,
		location,
		password,
		confirmPassword } = req.body;

	if (!firstName)						VALIDATION(100, res)
	if (!lastName)						VALIDATION(100, res)
	if (!email)							VALIDATION(100, res)
	if (!password)						VALIDATION(100, res)
	if (!confirmPassword)				VALIDATION(100, res)
	if (!age)							VALIDATION(100, res)
	if (!gender)						VALIDATION(100, res)
	
	if (password !== confirmPassword) 	VALIDATION(200, res)
	if (password.length < 6)			VALIDATION(300,res)
	
	Doctor.findOne({
	  $or: [{ email }, { username }],
	}).then((doctor) => { if (doctor){
		if (doctor.email === email) 			VALIDATION(400, res);
		if (doctor.username === username) 		VALIDATION(500, res);
	}}) 


	const newDoctor = new Doctor({
		firstName,
		lastName,	
		email,
		password,
		age,
		gender,
		location	
	});
	newDoctor.save((err , savedDoctor)  => {
		if (err) return res.json(err);
		res.json(savedDoctor)
	})
});


router.post("/login", (req, res, next) => {
	passport.authenticate("local", (e, doctor, info) => {
		
		if (info) {
			console.log(`Error: ${info.message}`);
			return res.send({ error : { msg: info.message } });
			} else {
				req.login(doctor, (err) => {
					if (err) return next(err);
					console.log(doctor);
				});
				res.send(doctor);
			}
		})(req, res, next);
});

router.get("/", (req, res, next) => {
	console.log("===== doctor!!======");
	console.log(req.doctor);
	if (req.doctor) {
		res.json({ doctor: req.doctor });
	}
	else {
		res.send("no doctor");
	}
});

router.get('/list', (req, res) => {
	Doctor.find().then(doctors => {
		res.json(doctors);
	});
});

router.get("/logout", (req, res) => {
	req.logout();
	res.send("logged out");
});

router.delete("/id", (req, res) => {
	console.log("delete doctor");
	Doctor.findByIdAndDelete(req.params.id, (err, deletedDoctor) => {
		if (err) return res.json(err);
		res.json(deletedDoctor);
	});
});

module.exports = router;