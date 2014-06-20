var _ = require('underscore'),
    blog = require('../app/controllers/blog'),
    comment = require('../app/controllers/comment');

// Stores a dictionary with route paths as keys and their corresponding static html files as values.
var URLToFileMap = {
};

// Renders the proper web page for all static pages by parsing the route from the req object.
var renderStaticPage = function(req, res){
  res.render(URLToFileMap[req.route.path], {
      title: 'XIP'
  });
};



module.exports = function(app){
/* Client Routes */
  // All static pages
  _.each(URLToFileMap, function(value, key){
    app.get(key, renderStaticPage);
  });

  app.get( '/', blog.index);
  app.get( '/blog', blog.getAll);
  app.post('/blog', blog.create);
  app.get( '/comment', blog.create);
  app.post('/comment/:post', comment.create);
};


