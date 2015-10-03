module.exports = function(grunt) {

  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        jshintrc: './.jshintrc'
      },
      all: [
        '*.js',
        'app/{,*/}*.js',
        'config/{,*/}*.js',
        'test/{,*/}*.js'
      ]
    },

    jscs: {
      src: [
        '*.js',
        'app/{,*/}*.js',
        'config/{,*/}*.js',
        'test/{,*/}*.js'
      ],
      options: {
        config: '.jscsrc',
        esnext: true,
        verbose: true
      }
    },

    mochacli: {
      options: {
        reporter: 'nyan',
        bail: true
      },
      all: ['test/{,*/}*.js']
    }

  });

  grunt.registerTask('default', [
    'jshint',
    'jscs'
  ]);

  grunt.registerTask('test', ['jshint', 'jscs', 'mochacli']);

};
