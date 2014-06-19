var express = require('express'),
    auth = require('http-auth'),
    bcrypt = require('bcrypt');

var basic = auth.basic({
    realm: "Sign in to the Project XiP blog!"
  }, function (username, password, callback) { // Custom authentication method.
    console.log(username, password);
    bcrypt.compare(password, process.env.BLOG_PASS_HASH, function(err, response){
      if(response){
        console.log(response);
        callback(true);
      }else{
        callback(false);
      }
    });
  }
);

// Configuration for express server
module.exports = function(app, config) {
  app.configure(function () {
    app.use(express.compress());
    app.use(express.static(config.root + '/public'));
    app.set('port', config.port);
    app.set('views', config.root + '/app/views');
    //Using jade templating
    app.set('view engine', 'jade'); 
    app.use(express.logger('dev'));
    app.use(express.urlencoded());
    app.use(express.json());
    app.use(auth.connect(basic));
    app.use(app.router);
    app.use(function(req, res) {
      res.status(404).render('404', { title: '404' });
    });
  });
};

