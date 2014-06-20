var mongoose = require('mongoose'),
    BlogPost = require('../models/blog').model,
    BlogComment = require('../models/comment').model,
    _ = require('underscore');
 
exports.create = function(req, res) {
  req.body.post = req.params.post;
  BlogComment.create(req.body, function (err, comment){
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).json(comment);
    }
  });
};

