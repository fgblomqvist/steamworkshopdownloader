module.exports = function (grunt) {

    grunt.registerTask('watch', [ 'watch' ]);
    grunt.registerTask('production', ['less:production', 'cachebuster']);
    grunt.registerTask('default', ['less:dev', 'cachebuster']);

    grunt.initConfig({
        cachebuster: {
            options: {
                format: 'json',
                basedir: 'steamworkshopdownloader'
            },
            'steamworkshopdownloader/static/cachebusters.json': ['steamworkshopdownloader/static/css/style.min.css']
        },
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
                tasks: ['less:dev', 'cachebuster'],
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
            },
            js: {
                files: ['steamworkshopdownloader/static/js/**/*.js'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-cachebuster');

};