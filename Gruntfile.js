'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-sass');

  var reloadPort = 35729,
    files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    watch: {
      options: {
        nospawn: true,
      },
      sass: {
        files: ['assets/styles/**/*.sass'],
        tasks: ['sass'],
        options: {
          livereload: reloadPort
        }
      },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      client: {
        files: [
          'assets/js/**/*.js'
        ],
        tasks: ['copy:js'],
        options: {
          livereload: reloadPort
        }
      },
      images: {
        files: [
          'assets/imgs/**'
        ],
        tasks: ['copy:imgs'],
        options: {
          livereload: reloadPort
        }
      },
      css: {
        files: [
          'assets/styles/plain_css/**'
        ],
        tasks: ['copy:css'],
        options: {
          livereload: reloadPort
        }
      },
      jade: {
        files: ['app/views/**/*.jade'],
        options: {
          livereload: reloadPort
        }
      }
    },
    // Hint Config
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'app.js',
        'assets/js/**/*.js',
        'app/**/*.js',
   
      ]
    },
    // uglify javascript
    uglify: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'assets/js',
          src: '**/*.js',
          dest: 'public/js'
        }]
      }
    },
    // Sass Config
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/styles',
          src: ['**/*.sass'],
          dest: 'public/styles',
          ext: '.css'
        }]
      }
    },
    // Imagemin Config
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/imgs',
          src: '**/*.{png,jpg,jpeg}',
          dest: 'public/imgs'
        }]
      }
    },
    // SVGmin Config
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/imgs',
          src: '{,*/}*.svg',
          dest: 'public/imgs'
        }]
      }
    },
    // Copy 
    copy: {
      main: {
        expand: true,
        cwd: 'assets/',
        src: ['js/**','imgs/**','styles/**/*.css'],
        dest: 'public/',
      },
      js: {
        expand: true,
        cwd: 'assets/js',
        src: '**',
        dest: 'public/js',
      },
      imgs: {
        expand: true,
        cwd: 'assets/imgs',
        src: '**',
        dest: 'public/imgs',
      },
      css: {
        expand: true,
        cwd: 'assets/styles/plain_css',
        src: '*.css',
        dest: 'public/styles'
      }
    },
    // Open Config
    open: {
      delayed: {
        path: 'http://localhost:3000',
        app: 'Google Chrome',
        options: {
          delay: 100
        }
      }
    },
    // Cleans directories
    clean: {
      src: ['public/imgs/','public/js/','public/styles/','.sass-cache']
    },
    //Shell commands
    shell: {
      //Running mongodb
      mongo: {
        command: 'mongod --diaglog 0 --profile 0 --quiet --dbpath db/&',
          options: {
              async: true,
              stdout: false,
              stderr: true
          }
        }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  // Live reload
  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','), function (err, res) {
        var reloaded = !err && res.statusCode === 200;
        if (reloaded)
          grunt.log.ok('Delayed live reload successful.');
        else
          grunt.log.error('Unable to make a delayed live reload.');
        done(reloaded);
      });
    }, 700);
  });

  grunt.registerTask('default', ['shell:mongo','develop', 'clean' ,'copy:main' ,'sass', 'open:delayed', 'watch']);
  grunt.registerTask('build', ['uglify', 'sass', 'imagemin']);//Add more
};