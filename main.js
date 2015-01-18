require.config( {

    //baseUrl: 'app',

    paths: {
        'angular':       'bower_components/angular/angular',
        'app':           'app/app',
        'async':         'bower_components/async/lib/async',
        'angular-route': 'bower_components/angular-route/angular-route',

        'tunnel': 'app/objects/tunnel-object',
        'enemy':  'app/objects/enemy-object',
        'screen': 'app/objects/screen-object'
    },

    shim: {

        'angular': {
            exports: 'angular'
        },

        'app': {
            deps:    [ 'angular' ],
            exports: 'app'
        }

    }

} );

require( [
        'app',

        'screen',
        'enemy',
        'tunnel'
    ],
    function () {

        console.log( 'im at main' );
        angular.bootstrap( document, [ 'gameTwo' ] );

    }
);

