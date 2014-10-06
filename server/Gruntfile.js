'use strict';

module.exports = function (grunt) {
  // Show elapsed time at the end
  require('time-grunt')(grunt);
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // Load the plugin that starts a node server
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-jasmine-node-coverage');

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
      coverage: { //https://github.com/paazmaya/grunt-jasmine-node-coverage/tree/multi-grunting#optionsspecfolders
        excludes: ['lib/l.js', 'spec']
      },
      options: {
        specFolders:['spec/'],
        projectRoot:'',
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: 'spec',
        coffee: true,
        verbose: false,
        noStack: false,
        jUnit: {
          report: false,
          savePath : "./build/reports/jasmine/",
          useDotNotation: true,
          consolidate: true
      },
      growl: false
      }
      //,
      //all: ['spec/'] // will be merged with the specFolders option and the projectRoot
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
  grunt.registerTask('default', ['jshint', 'jasmine_node']);

};