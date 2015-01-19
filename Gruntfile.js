module.exports = function ( grunt ) {

    grunt.initConfig( {

        requirejs: {
            compile: {
                options: {
                    baseUrl:                '.',
                    name:                   'main',
                    mainConfigFile:         "./main.js",
                    out:                    "built/app.build.js",
                    findNestedDependencies: true,
                    include:                [ 'bower_components/requirejs/require.js' ],
                    optimize:               'uglify'
                }
            }
        },
        copy:      {
            sprites: {
                src:  'css/sprites/*',
                dest: 'built/'
            },
            music:   {
                src:  'bg.mp3',
                dest: 'built/'
            }
        },

        htmlbuild: {
            stable: {
                src:     'index.html',
                dest:    'built/',
                options: {
                    scripts: {
                        appBuild: 'built/app.build.js'
                    },
                    styles:  {
                        concatCss: 'built/build.css'
                    }
                }
            }
        },

        cssmin: {
            stable: {
                files: {
                    'built/build.css': [ 'bower_components/bootstrap/dist/css/bootstrap.min.css', 'css/main.css' ]
                }
            }
        },

        less: {
            compile: {
                files: {
                    "css/main.css": "css/main.less"
                }
            }
        },

        clean: {
            compile: [ 'built/build.css', 'built/app.build.js' ]
        }
    } );

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks( 'grunt-contrib-less' );
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-html-build' );
    grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );

    grunt.task.registerTask( 'default', [ 'requirejs', 'less', 'copy', 'cssmin', 'htmlbuild', 'clean' ] );

};