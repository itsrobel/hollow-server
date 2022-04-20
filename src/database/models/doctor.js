const mongoose      =   require('mongoose');
const bcrypt        =   require('bcryptjs');
mongoose.promise    =   Promise;
const doctorSchema  =   new mongoose.Schema({
	email:        {		type: String, unique:true, required: true},
	password:     {		type: String, required: true},
	firstName:    {		type: String, required: true},
	lastName:     {		type: String, required: true},
	age:          {		type: Date,   required: true},
	gender:       {		type: String, required: true},
	location:     {		type: Array,  required: false},
	spaces:       {		type: Array,  default: [], required: false}
})


doctorSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password);
	},
	hashPassword: (plainTextPassword) => {
		return bcrypt.hashSync(plainTextPassword, 10);
	},
}

doctorSchema.pre("save", function (next) {
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

module.exports    = mongoose.model("Doctor", doctorSchema)
