const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

//Define model
const userSchema = new Schema({
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  // confirmPassword
});

// On save Hook, encrypt pass, before saving, run this function
userSchema.pre("save", function (next) {
  const user = this;
  //generate a salt then run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    // hash the pass using the salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }
      //Overwrite the pass with the salted one
      user.password = hash;
      next();
    });
  });
});

//Create model
const model = mongoose.model("user", userSchema);

//Export model
module.exports = model;

// export default mongoose.model('user', userSchema)
