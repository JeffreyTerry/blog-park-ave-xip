var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId;

var commentSchema = mongoose.Schema({
  post: {type: ObjectId, required: true},
  text: {type: String, required: true}
});

var commentModel = mongoose.model('comment', commentSchema);
exports.model = commentModel;


