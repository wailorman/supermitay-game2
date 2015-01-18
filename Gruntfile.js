module.exports = function ( grunt ) {

    grunt.initConfig( {

        requirejs: {
            compile: {
                options: {
                    baseUrl:                '.',
                    name:                   'main',
                    mainConfigFile:         "./main.js",
                    out:                    "app.build.js",
                    findNestedDependencies: true,
                    include:                [ 'bower_components/requirejs/require.js' ],
                    optimize:               'uglify'
                }
            }
        }

    } );

    grunt.loadNpmTasks( 'grunt-contrib-requirejs' );

};