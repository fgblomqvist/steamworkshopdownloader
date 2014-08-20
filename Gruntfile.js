module.exports = function(grunt) {
 
  grunt.registerTask('watch', [ 'watch' ]);
  grunt.registerTask('production', ['less:production']);
  grunt.registerTask('default', ['less:dev']);

  grunt.initConfig({
    less: {
      production: {
        options: {
          cleancss: true
        },
        files: {
          "steamworkshopdownloader/static/css/style.min.css": "less/style.less"
        }
      },
      dev: {
        options: {
        },
        files: {
          "steamworkshopdownloader/static/css/style.min.css": "less/style.less"
        }
      }
    },
    watch: {
      css: {
        files: ['less/**/*.less'],
        tasks: ['less:dev'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['steamworkshopdownloader/static/partials/**/*.html',
                'steamworkshopdownloader/templates/**/*.html'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
};