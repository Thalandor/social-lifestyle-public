var mongoose = require('mongoose')

const feedSchema = new mongoose.Schema({
  user: String,
  title: String,
  description: String,
  image: String,
  category: [{type: String}]
});


const Feed = mongoose.model("feed", feedSchema, "feed");
module.exports = Feed;