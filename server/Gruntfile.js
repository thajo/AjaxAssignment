'use strict';

module.exports = function (grunt) {
  // Show elapsed time at the end
  require('time-grunt')(grunt);
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // Load the plugin that starts a node server
  grunt.loadNpmTasks('grunt-express-server');

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'nodeunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      }
    },
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'server.js'
        }
      }
    }
    });

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);

};
