/* global require */

var grunt = require('grunt');

grunt.initConfig({
  pkg: grunt.file.readJSON('bower.json'),
  uglify: {
    options: {
      banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd HH:MM:ss') %> */\n"
    },
    build: {
      src: ['js-src/components/*.js', 'js-src/main.js'],
      dest: 'app.js'
    }
  },
  watch: {
    react: {
      files: ['js-src/**/*.js'],
      tasks: ['uglify'],
      options: {
        spawn: false,
      }
    }
  },
  jshint: {
    lint: ['server.js', 'Gruntfile.js', 'js-src/**/*.js'],
    options: {
      jshintrc: '.jshintrc'
    }
  }
});

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-jshint');

grunt.registerTask('default', ['jshint', 'uglify']);
grunt.registerTask('heroku', ['jshint', 'uglify']);
grunt.registerTask('travis', ['jshint']);
