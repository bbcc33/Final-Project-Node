const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passportLocal = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre("save", async function () {
    console.log("in Model User preSave middlware:");
  
    const salt = await bcrypt.genSalt(10);
  
    console.log("salt:\n", salt);
    console.log("password: ", this.password);
  
    this.password = await bcrypt.hash(this.password, salt);
  
    console.log("password after hash:  ", this.password);
  });
  
  UserSchema.methods.comparePassword = async function (candidatePassword) {
    console.log(
      "User Schema => comparePassword : Candidate password:  ",
      candidatePassword,
      "\nUser Schema => comparePassword : this.password is:    ",
      this.password
    );
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('poemUser', UserSchema);