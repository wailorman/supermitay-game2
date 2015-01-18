module.exports = function ( grunt ) {

    grunt.initConfig( {

        requirejs: {
            compile: {
                options: {
                    baseUrl: 'app/',
                    name: 'app',
                    mainConfigFile: "main.js",
                    out:            "built/app.js",
                    include: [ '../bower_components/requirejs/require.js' ]
                }
            }
        }

    } );

    grunt.loadNpmTasks( 'grunt-contrib-requirejs' );

};