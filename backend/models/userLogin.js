var mongoose = require('mongoose')

const userLoginSchema = new mongoose.Schema({
  publicAddress: String,
  nonce: String,
  username: String
});


const UserLogin = mongoose.model("userLogin", userLoginSchema, "userLogin");
module.exports = UserLogin;