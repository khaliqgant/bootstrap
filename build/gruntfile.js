module.exports = function(grunt) {

  var
    project    = '../',
    scss       = project + 'scss/',
    coffee     = project + 'coffee/',
    css        = project + 'css/',
    js         = project + 'js/';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: [css+"*"],

    sass: {
      dev: {
        files: [{
          expand: true,
          cwd: scss,
          src: [
            "*.scss",
            "!_*.scss"
          ],
          dest: project + css + 'components',
          ext: '.css'
        }],
        options: {
          compass: true,
          cacheLocation: scss + '.sass_cache',
          style: 'expanded'
        }
      }
    },

    cssmin: {
      combine: {
        files: {
          '../assets/css/app.css': [
            css + 'components/*.css'
          ]
        }
      }
    },

    coffee: {
      compile: {
        files: {
          '../static/js/app.js': [
            coffee + 'app.coffee'
          ]
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          js + 'app.js'
        ],
        dest: js + 'app.js'
      }
    },

    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: js,
          src: '*.js',
          dest: js
        }]
      }
    },

    watch: {
      scripts: {
        files: [coffee + '*.coffee'],
        tasks: ['coffee','concat','jshint','uglify']
      },
      styles: {
        files: [scss + '*.scss'],
        tasks: ['clean', 'sass', 'cssmin']
      },
      triggerLiveReloadOnTheseFiles: {
          options: {
              livereload: true
          },
          files: [
              css + '/*.css',
              js + '/*.js',
          ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('styles', 'def', function(){
    grunt.task.run('sass');
    grunt.task.run('cssmin');
  });

  grunt.registerTask('scripts', 'def', function(){
    grunt.task.run('coffee');
    grunt.task.run('concat');
    grunt.task.run('uglify');
  });

  grunt.registerTask('default', 'def', function(){
    grunt.task.run('styles');
    grunt.task.run('scripts');
  });

};
