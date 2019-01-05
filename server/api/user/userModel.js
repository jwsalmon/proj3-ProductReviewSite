const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    useCreateIndex: true
  },

  // dont store the password as plain text
  password: {
    type: String,
    required: true
  }
});

// this middleware run everytime before we create a new user
// it converts password to encrypt password
UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  this.password = this.encryptPassword(this.password);
  next();
});


UserSchema.methods = {
  // check the passwords on signin, if user's saved hash password match plain text password
  authenticate: plainTextPword => bcrypt.compareSync(plainTextPword, this.password),

  // hash the passwords, takes plain text password and encrypt it
  encryptPassword: (plainTextPword) => {
    if (!plainTextPword) {
      return '';
    } else {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPword, salt);
    }
  },

  toJson: () => {
    // toObject is Mongoose document method
    const obj = this.toObject();
    delete obj.password;
    return obj;
  }
};

module.exports = mongoose.model('user', UserSchema);
