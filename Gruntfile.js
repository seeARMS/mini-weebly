module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "css/main.css": "less/main.less"
        }
      },

    },
    jshint: {
       all: ['Gruntfile.js', 'js/*.js', 'js/app/**/*.js']
    },
    watch: {
      styles: {
        files: ['less/*.less', '<%= jshint.all %>'],
        tasks: ['less', 'jshint'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['watch']);
};