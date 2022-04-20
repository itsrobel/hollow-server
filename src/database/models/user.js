const mongoose    = require("mongoose");
const bcrypt      = require("bcryptjs");
mongoose.promise  = Promise;

// Define userSchema
const userSchema  = new mongoose.Schema({
	username:   { 	type: String, unique: false, required: false },
	email:      { 	type: String, unique: true, required: true },
	password:   { 	type: String, unique: false, required: true },
	age :       {	type: Date, required: false},
	spaces :    {	type: Array, default: []},
});

// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compare(inputPassword, this.password);
	},
	hashPassword: (plainTextPassword) => {
		return bcrypt.hashSync(plainTextPassword, 10);
	},
};

// Define hooks for pre-saving
userSchema.pre("save", function (next) {
	if (!this.password) {
		//double check the password
		console.log("models/user.js =======NO PASSWORD PROVIDED=======");
		next();
	} else {
		console.log("models/user.js hashPassword in pre save");

		this.password = this.hashPassword(this.password);
		next();
	}
});

module.exports 		= mongoose.model("User", userSchema);
