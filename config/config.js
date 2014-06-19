var path = require('path'),
    fs = require('fs'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

process.env.BLOG_USER_HASH = '$2a$10$LzQFXPB1RcBa3JmSEdr0YOlMTkJVmqkdPOzdM3H3Si8j2xoQDVtX6';
process.env.BLOG_PASS_HASH = '$2a$10$o2/3wMipYP/Wpbit/rR/0OyJyoeCYAlF39fJCxtEBkkfsZcqrpd.2';

// Configuration for different environments
var config = {
  development: {
    root: rootPath,
    app: {
      name: 'XiP-Blog'
    },
    port: 3000,
    db: 'mongodb://localhost/XiP-Blog-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'XiP-Blog'
    },
    port: 3000,
    db: 'mongodb://localhost/XiP-Blog-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'XiP-Blog'
    },
    port: 3000,
    cred: {
        // Put the actual certificate path on your server. 
        /* 
        key: fs.readFileSync('/ssl/server/keys/server1.key'),
        cert: fs.readFileSync('/ssl/server/certificates/server1.crt'),
        ca: fs.readFileSync('/ssl/ca/ca.crt')
        */
    },
    db: 'mongodb://localhost/XiP-Blog-production'
  }
};

module.exports = config[env];

