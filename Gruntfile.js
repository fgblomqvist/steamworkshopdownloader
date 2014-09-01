module.exports = function (grunt) {

    grunt.registerTask('watch', ['watch']);
    grunt.registerTask('production', ['less:production', 'ngAnnotate', 'uglify:production', 'cachebuster']);
    grunt.registerTask('default', ['less:dev', 'ngAnnotate', 'uglify:dev', 'cachebuster']);

    grunt.initConfig({
        cachebuster: {
            production: {
                options: {
                    format: 'json',
                    basedir: 'steamworkshopdownloader'
                },
                src: ['steamworkshopdownloader/static/css/style.min.css',
                      'steamworkshopdownloader/static/js/app.min.js'],
                dest: 'steamworkshopdownloader/static/cachebusters.json'
            }
        },
        less: {
            production: {
                options: {
                    cleancss: true
                },
                files: {
                    'steamworkshopdownloader/static/css/style.min.css': 'less/style.less'
                }
            },
            dev: {
                options: {
                },
                files: {
                    'steamworkshopdownloader/static/css/style.min.css': 'less/style.less'
                }
            }
        },
        uglify: {
            production: {
                options: {
                    mangle: true,
                    compress: true
                },
                files: {
                    'steamworkshopdownloader/static/js/app.min.js': ['steamworkshopdownloader/static/js/app.min.js',
                                                                     'javascript/other.js']
                }
            },
            dev: {
                options: {
                    beautify: true,
                    compress: false,
                    mangle: false
                },
                files: {
                    'steamworkshopdownloader/static/js/app.min.js': ['steamworkshopdownloader/static/js/app.min.js',
                                                                     'javascript/other.js']
                }
            }
        },
        ngAnnotate: {
            production: {
                options: {
                },
                files: {
                    'steamworkshopdownloader/static/js/app.min.js': ['javascript/angularjs/app.js',
                                                                     'javascript/angularjs/controllers.js',
                                                                     'javascript/angularjs/directives.js',
                                                                     'javascript/angularjs/filters.js',
                                                                     'javascript/angularjs/services.js']
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
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-cachebuster');
    grunt.loadNpmTasks('grunt-ng-annotate')
};