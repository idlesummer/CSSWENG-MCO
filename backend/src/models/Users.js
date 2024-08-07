// const bcrypt = require('bcrypt');
// const { Schema, model } = require('mongoose');
// const validator = require('validator');

// const userSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   }
// });


// // Static signup method
// userSchema.statics.signup = async function (email, password) {

//   // Check for empty fields
//   if (!email || !password)
//     throw Error('All fields must be filled');
  
//   // Check for invalid email
//   if (!validator.isEmail(email))
//     throw Error('Email is not valid');

//   // Check for weak password
//   // if (!validator.isStrongPassword(password))
//     // throw Error('Password not strong enough');

//   // Check for short passwords
//   if (password.length <= 8)
//     throw Error('Password must be more than 8 characters long');

//   const exists = await this.findOne({ email });

//   // Check if email is already in use
//   if (exists)
//     throw Error('Email already in use.');

//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);
//   const user = await this.create({ email, password: hash });
//   return user;
// };


// module.exports = model('Users', userSchema);
