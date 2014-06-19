var mongoose = require('mongoose'),
    BlogPost = mongoose.model('blog'),
    _ = require('underscore');
 
exports.create = function(req, res) {
  console.log(req.body);
  BlogPost.create(req.body, function (err, user){
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

      res.render('blog', {
        posts: posts,
        title: 'Project XiP Blog'
      });
    }
  });
}
