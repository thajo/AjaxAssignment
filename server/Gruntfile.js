'use strict';

module.exports = function (grunt) {
  // Show elapsed time at the end
  require('time-grunt')(grunt);
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // Load the plugin that starts a node server
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-jasmine-node');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //nodeunit: {
    //  files: ['test/**/*_test.js']
    //},
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
      }
    },
    jasmine_node: {
            specNameMatcher: 'spec',
            projectRoot: '.',
            requirejs: false,
            forceExit: true,
            jUnit: {
                report: false,
                savePath : "./build/reports/jasmine/",
                useDotNotation: true,
                consolidate: true
            }
        },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib']
      },
      test: {
        files: ['spec/*.spec.js'],
        tasks: ['jasmine_node'],
        options: {
          nospawn: true
        }
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
  grunt.registerTask('default', ['jasmine_node']);

};
