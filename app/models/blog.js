var mongoose = require('mongoose');
exports.mongoose = mongoose;

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

// Blog Post Schema
var blogSchema = mongoose.Schema({
  text: {type: String, required: true},
  date: {type: Date, required: true}
});

// Export blog post model
var blogModel = mongoose.model('blog', blogSchema);
exports.model = blogModel;

