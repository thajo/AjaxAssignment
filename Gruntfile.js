'use strict';

module.exports = function (grunt) {
  // Show elapsed time at the end
  require('time-grunt')(grunt);


  // Load all grunt tasks
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-jasmine-node-coverage');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Project configuration.
    grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Adding the jshint task
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

    // Adding the jasmine-node task for test and coverage
    jasmine_node: {
      coverage: { //https://github.com/paazmaya/grunt-jasmine-node-coverage/tree/multi-grunting#optionsspecfolders
        excludes: ["spec"], // dont coverage on the test-files
        verbose: true
      },
      options: {
        specFolders:['spec/'],
        projectRoot:'',
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: 'spec',
        verbose: true,
        noStack: false
      }
    },

    compress: {
        main: {
            options: {
                archive: 'archive/release-' +(new Date()).toISOString() +'.zip'
            },
            files: [
                {src: ['lib/**'], dest: 'archive/'} // includes files in path and its subdirs
            ]
        }
    },

    copy: {
        main: {
            files: [
                // includes files within path and its sub-directories
                {expand: true, src: ['lib/**'], dest: 'build/'},
                {expand: true, src: ['app.js'], dest: 'build/', filter: 'isFile'},
                {expand: true, src: ['data/**'], dest: 'build/'}
            ]
        }
    }



  });



  // Default task.
  grunt.registerTask('default', ['jshint', 'jasmine_node']);
  grunt.registerTask('build', ['jshint', 'compress', 'copy']);

};