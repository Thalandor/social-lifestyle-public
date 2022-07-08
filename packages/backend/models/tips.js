var mongoose = require('mongoose')

const tipsSchema = new mongoose.Schema({
  transaction: String,
  amount: String,
  from: String,
  to: String,
  signature: String
});


const Tips = mongoose.model("tips", tipsSchema, "tips");
module.exports = Tips;