const mongoose      =   require('mongoose');
const bcrypt        =   require('bcryptjs');
mongoose.promise    =   Promise;
const doctorSchema  =   new mongoose.Schema({
  email:        {type: String, unique:true, require: true},
  password:     {type: String, require: true},
  firstName:    {type: String, require: true},
  lastName:     {type: String, require: true},
  age:          {type: Date,   require: true},
  gender:       {type: String, require: true},
  location:     {type: Array,  require: true},
  space:        {type: Array,  require: true}
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

const Doctor    = mongoose.model("Doctor", doctorSchema)
module.exports  = Doctor;
