// wrapper
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /**
    * Grunt Sass
    * Compile Sass to CSS using node-sass
    * https://www.npmjs.com/package/grunt-sass
    */
    sass: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          'css/main.css': 'assets/scss/main.scss'
        }
      }
    },

    /**
    * Grunt Contrib Uglify
    * Minify JavaScript files
    * https://www.npmjs.com/package/grunt-contrib-uglify
    */
    uglify: {
      my_target: {
        files: {
          'js/main.min.js': ['node_modules/jquery/dist/jquery.js','assets/js/main.js']
        }
      }
    },

    /**
    * Grunt Update Reference
    * Changed resources's reference, to get cache bust
    * https://www.npmjs.com/package/grunt-update-reference
    */
    reference: {
      options:{
        //Define what files contain some reference. 
        searchFileType: [ "*.html", "*.js", "*.css" ],
        //If has some file or path to ignore, path is base on "options.searchPathBase". 
        searchIgnore:[ "gruntfile.js"],
        //Task's log, "simple", "all" or "none" 
        log:"simple"
      },
      dist: {
        options: {
          //The base path. 
          searchPathBase: "./",
          //Prevent watch instantly changes, which changed by this task. 
          // referenceIgnore:["*.html"]
        },
        //What kind of files that may needed to be update references.(path is not base on "options.searchPathBase") 
        src: [ "js/*.js", "css/*.css"]
      }
    },

    /**
    * Grunt Contrib Watch
    * Monitor files and execute tasks
    * https://www.npmjs.com/package/grunt-contrib-watch
    */
    watch: {
      sass: {
        files: [
          'assets/scss/**/*.scss'
        ],
        tasks: [
          'sass'
        ]
      },
      scripts: {
        files: [
          'assets/js/*.js'
        ],
        tasks: [
          'uglify'
        ]
      }
    }
  });

  // Load tall plugins for task.
  require('load-grunt-tasks')(grunt);

  // Default task(s).
  grunt.registerTask('default', ['watch']);

  // Custom task(s).
};