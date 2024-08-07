// const jwt = require('jsonwebtoken');
// const Users = require('#models/Users.js');


// function createToken(_id) {
//   return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
// }


// // Login user
// async function loginUser(req, res) {
//   try {
//     res.status(200).json({ mssg: 'login user' });
    
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// }


// // Signup user
// async function signupUser(req, res) {
//   try {
//     const { email, password } = req.body;
//     const user = await Users.signup(email, password);
//     const token = createToken(user._id);

//     res.status(200).json({ email, token });

//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// }


// module.exports = {
//   loginUser,
//   signupUser,
// };
