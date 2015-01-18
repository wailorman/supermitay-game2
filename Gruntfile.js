module.exports = function ( grunt ) {

    grunt.initConfig( {

        requirejs: {
            compile: {
                options: {
                    baseUrl: '.',
                    name: 'app',
                    mainConfigFile: "./main.js",
                    out:            "built/app.js",
                    findNestedDependencies: true,
                    include: [ 'bower_components/requirejs/require.js' ]
                }
            }
        }

    } );

    grunt.loadNpmTasks( 'grunt-contrib-requirejs' );

};