var mongoose = require('mongoose'),
    BlogPost = require('../models/blog').model,
    BlogComment = require('../models/comment').model,
    _ = require('underscore');
 
exports.create = function(req, res) {
  BlogPost.create(req.body, function (err, post){
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).json({message:'success'});
    }
  });
};

exports.index = function(req, res){
  BlogPost.find({}, function(err, posts){
    if(err) res.status(500).json(err);
    else {
      /* sort the posts by date */
      _.sortBy(posts, function(post){
        return post.date;
      });

      /* reverse the order of the posts */
      function swap(list, i, j){
        var temp = list[i];
        list[i] = list[j];
        list[j] = temp;
      }
      var i = 0, j = posts.length - 1;
      while(i < j){
        swap(posts, i++, j--);
      }

      function addCommentsToPosts(posts, indexToAdd){
        if(indexToAdd >= posts.length){
          res.render('blog', {
            posts: posts,
            title: 'XiP Blog'
          });
        }else{
          BlogComment.find({'post': posts[indexToAdd]._id}, function(err, comments){
            posts[indexToAdd].comments = comments;
            addCommentsToPosts(posts, indexToAdd + 1);
          });
        }
      }

      addCommentsToPosts(posts, 0);
    }
  });
};

exports.getAll = function(req, res){
  BlogPost.find({}, function(err, posts){
    if(err) res.status(500).json(err);
    else {
      /* sort the posts by date */
      _.sortBy(posts, function(post){
        return post.date;
      });

      /* reverse the order of the posts */
      function swap(list, i, j){
        var temp = list[i];
        list[i] = list[j];
        list[j] = temp;
      }
      var i = 0, j = posts.length - 1;
      while(i < j){
        swap(posts, i++, j--);
      }

      function addCommentsToPosts(posts, indexToAdd){
        if(indexToAdd >= posts.length){
          res.status(200).json(posts);
        }else{
          BlogComment.find({'post': posts[indexToAdd]._id}, function(err, comments){
            posts[indexToAdd].comments = comments;
            addCommentsToPosts(posts, indexToAdd + 1);
          });
        }
      }

      addCommentsToPosts(posts, 0);
    }
  });
};
